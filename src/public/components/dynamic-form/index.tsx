/*
 * @Author: your name
 * @Date: 2021-02-08 11:09:42
 * @LastEditTime: 2021-04-30 11:47:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Mars/public/components/dynamic-form/index.tsx
 */
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
// @ts-ignore
import { Subject } from 'rxjs';
import { isEqual, cloneDeep } from 'lodash';
import {
  IDynamicFormProps,
  FormState,
  FormUnit,
  FormInstance,
  FiledProps,
  IValidator,
  AsyncValue,
  STATUS,
  ASYNC_STATUS,
  CHECK_ALL_RELATION_SHIP,
} from './type';

export const DynamicForm = (config?: IDynamicFormProps): FormInstance => {
  const form = useRef({
    values: config?.initValue || {}, // 记录表单字段值
    checkRelationship: config.checkRelationship, // 是否开启初始化依赖关系预检测纠错
    relayFileds: {} as any, // 记录字段的依赖关系，做性能优化用
    __status: {} as { [attr: string]: number[] }, // 记录表单字段的验证状态
    __msgs: {} as { [attr: string]: string[] }, // 记录表单字段的验证信息
    __onChanged: {} as any, // 记录表单字段是否发生过更改
    __errors: {} as { [attr: string]: string[] }, // 存储错误
    __hide: {} as { [attr: string]: boolean[] }, // 记录隐藏
  });
  const formState = useRef({ isValid: false } as FormState);

  const formInstance = useRef({} as FormInstance);

  const [state, setState] = useState(0);

  useEffect(() => {
    if (form.current.checkRelationship) {
      const { messageCenter } = formInstance.current;
      // 依赖关系预检测
      messageCenter.next(CHECK_ALL_RELATION_SHIP);
    }
  }, []);

  useEffect(() => {
    const { messageCenter } = formInstance.current;
    messageCenter.next('__async__');
  }, [state]);

  // 这里只执行一次创建函数，避免表单重新render的时候再创建
  useMemo(() => {
    // 数据分发器，提供订阅服务
    const messageCenter = new Subject<string>();
    const Field = (props: FiledProps) => {
      const { id, defaultValue, relier, filter, validators, debounce, render } = props;
      const FiledLabel = useCallback(render, []);
      const [, update] = useState(0);
      const asyncStatus = useRef({} as { [attr: string]: number });
      const timeRef = useRef<any>(null);

      const validate = () => {
        const asyncArr: IValidator[] = [];
        let isSyncAllValid = true;
        if (validators) {
          validators.forEach((v, index) => {
            const { validator, msg } = v;
            const res = validator(form.current.values[id].value, form.current.values);
            // 这里只有异步验证函数才有的逻辑
            if (typeof res === 'function') {
              asyncArr[index] = v;
            } else {
              if (res === false) {
                if (form.current.__onChanged[id]) {
                  form.current.__msgs[id][index] = msg;
                  form.current.__errors[id][index] = msg;
                } else {
                  form.current.__errors[id][index] = msg;
                }
                form.current.__status[id][index] = STATUS.failed;
                isSyncAllValid = false;
              } else if (res === true) {
                form.current.__msgs[id][index] = '';
                form.current.__errors[id][index] = '';
                form.current.__status[id][index] = STATUS.success;
              } else {
                console.error('同步验证必须返回布尔值ture｜false, 异常返回将视为false');
                isSyncAllValid = false;
                if (form.current.__onChanged[id]) {
                  form.current.__msgs[id][index] = '异常校验';
                  form.current.__errors[id][index] = '异常校验';
                }
                form.current.__status[id][index] = STATUS.failed;
              }
            }
          });
          // 同步验证通过后再进行异步验证
          if (isSyncAllValid) {
            asyncArr.forEach((v, index) => {
              // 每当vliadate被调用，代表有新的值
              if (v) {
                const { validator, msg, pending } = v;
                asyncStatus.current[index] = ASYNC_STATUS.new;
                // 如果有新的值且当前异步验证函数已经结束，则再调用异步验证函数验证新的值
                if (
                  asyncStatus.current[index] === ASYNC_STATUS.new &&
                  form.current.__status[id][index] !== STATUS.pending
                ) {
                  const validateSelf = () => {
                    // 开始调用验证前，把asyncStatus置为old，表示最近的新值已经处于验证中或被验证过了。
                    asyncStatus.current[index] = ASYNC_STATUS.old;
                    // onChanged对应的值表示当前组件是否被用户触发change，如果触发了就填写错误信息，避免一开始就满屏错误提示影响体验
                    if (form.current.__onChanged[id]) {
                      form.current.__msgs[id][index] = pending ? pending : '';
                      form.current.__errors[id][index] = pending ? pending : '';
                    }
                    // 当前组件正处于异步验证中
                    form.current.__status[id][index] = STATUS.pending;
                    const res = validator(form.current.values[id].value, form.current.values) as (
                      resolve,
                      reject,
                    ) => void;
                    res(
                      () => {
                        // 异步验证成功
                        form.current.__msgs[id][index] = '';
                        form.current.__errors[id][index] = '';
                        // 修改验证状态为 success
                        form.current.__status[id][index] = STATUS.success;
                        // 如果异步验证结束后发现当前组件又被用户输入了新的值，则继续递归验证新的值
                        if (asyncStatus.current[index] === ASYNC_STATUS.new) {
                          validateSelf();
                        } else {
                          // 如果异步验证结束后发现当前组件用户没有输入新的值，则更新当前组件（更新错误信息提示）
                          update(Math.random());
                          messageCenter.next('__async__');
                        }
                      },
                      () => {
                        // 异步验证失败
                        form.current.values[id].isvalid = false;
                        // 修改验证状态为 failed
                        form.current.__status[id][index] = STATUS.failed;
                        // onChanged对应的值表示当前组件是否被用户触发change，如果触发了就填写错误信息，避免一开始就满屏错误提示影响体验
                        if (form.current.__onChanged[id]) {
                          form.current.__msgs[id][index] = msg;
                          form.current.__errors[id][index] = msg;
                        }
                        // 如果异步验证结束后发现当前组件又被用户输入了新的值，则继续递归验证新的值
                        if (asyncStatus.current[index] === ASYNC_STATUS.new) {
                          validateSelf();
                        } else {
                          // 如果异步验证结束后发现当前组件用户没有输入新的值，则更新当前组件（更新错误信息提示）
                          update(Math.random());
                          // 向全局广播此次异步验证带来的更新
                          messageCenter.next('__async__');
                        }
                      },
                    );
                  };
                  validateSelf();
                }
              }
            });
          }
        }
      };

      const onChange = (value: any) => {
        const { messageCenter } = formInstance.current;
        const filed = form.current.values[id];
        if (typeof filter === 'function') {
          filed.value = filter(value);
        } else {
          filed.value = value;
        }
        form.current.__onChanged[id] = true;
        validate(); // 每当有新值变动时就验证一次

        update(Math.random());

        if (debounce) {
          // 这里开启防抖
          if (typeof debounce !== 'number') {
            form.current.values[id].debounce = 200;
          }
          if (timeRef.current) {
            clearTimeout(timeRef.current);
          }

          timeRef.current = setTimeout(() => {
            clearTimeout(timeRef.current);
            timeRef.current = null;
            messageCenter.next(id); // 当前字段发生变更，向全局广播此次变更
          }, debounce);
        } else {
          messageCenter.next(id); // 当前字段发生变更，向全局广播此次变更
        }
      };

      useMemo(() => {
        // 这里对表单组件做各种初始化配置

        if (!form.current.values[id]) {
          form.current.values[id] = {
            value: defaultValue || null,
          };
        } else {
          if (defaultValue) {
            form.current.values[id].value = defaultValue;
          }
        }
        const errMsg = new Array(validators ? validators.length : 0);
        const status = new Array(validators ? validators.length : 0);
        errMsg.fill('');
        status.fill(STATUS.failed);
        form.current.__msgs[id] = errMsg;
        form.current.__errors[id] = [...errMsg];
        form.current.__status[id] = status;
        // 初始化验证
        validate();
      }, [state]);

      useEffect(() => {
        const relierFunc = Array.isArray(relier) ? relier[0] : relier;
        const isRelated = (key: string) => {
          let params = null;
          if (Array.isArray(relier)) {
            try {
              params = relier[1];
              if (!Array.isArray(params)) throw '依赖项必须是数组';
            } catch (e) {
              console.error(e);
              params = null;
            }
          }
          return params ? params.includes(key) : true;
        };
        // 设置了依赖函数的字段才订阅消息
        const { messageCenter } = formInstance.current;

        messageCenter.subscribe({
          // 订阅其它字段更新表单内容后的消息，获取最新状态的整体表单
          next: (key: string) => {
            //  1.处理和自己相关的信息
            //  2.没有配置依赖字段默认处理所有信息
            //  3.默认处理初始化依赖关系检测信息
            if ((key !== id && isRelated(key) && key !== '__async__') || key === CHECK_ALL_RELATION_SHIP) {
              if (relierFunc) {
                const formValues = form.current.values;
                const newVal = relierFunc(
                  (targetName) => cloneDeep(formValues[targetName]),
                  cloneDeep(formValues[id]),
                  (newVal) => {
                    form.current.values[id] = newVal;
                    setState(Math.random());
                  },
                  key,
                );
                form.current.__hide[id] = newVal.hide;
                const relay = (newVal) => {
                  if (!isEqual(newVal, formValues[id])) {
                    // 监听当前表单字段更新，只重新render当前字段
                    if (key === CHECK_ALL_RELATION_SHIP) {
                      console.log(`检测到字段${id}初始化值和依赖关系规则不匹配，已纠正初始值`);
                    }
                    form.current.values[id] = newVal;
                    if (form.current.__onChanged[id] !== true) {
                      const isInit = Object.values(form.current.__onChanged).every((v) => !v);
                      if (!isInit) {
                        form.current.__onChanged[id] = true;
                      }
                    }
                    validate();
                    update(Math.random());
                    messageCenter.next(id);
                  }
                };

                if (typeof newVal === 'function') {
                  (newVal as AsyncValue)(
                    (value) => relay(value),
                    (err) => {
                      console.error(`获取依赖信息失败: ${err}`);
                    },
                  );
                } else {
                  relay(newVal);
                }
              } else if (key === CHECK_ALL_RELATION_SHIP) {
                validate();
                update(Math.random());
              }
            }
          },
        });
      }, []);

      return <FiledLabel onChange={onChange} filedValue={form.current.values[id]} messages={form.current.__msgs[id]} />;
    };

    // eslint-disable-next-line react/no-multi-comp
    const FormUnit = ({ render: Ui }: FormUnit) => {
      const [, update] = useState(0);
      useEffect(() => {
        const { messageCenter } = formInstance.current;
        const renderFormUnit = () => {
          const isValid = Object.keys(form.current.__status)
            .filter((id) => !form.current.__hide[id]) // 隐藏的组件不校验
            .every((key) => form.current.__status[key].every((i) => i === STATUS.success));
          if (formState.current.isValid !== isValid) {
            formState.current.isValid = isValid;
            update(Math.random());
          }
        };
        messageCenter.subscribe({
          next: () => renderFormUnit(),
        });
      }, []);
      return <Ui isValid={formState.current.isValid} />;
    };

    const getValues = () => form.current.values;

    const getPureValues = () => {
      const data = {};
      Object.keys(form.current.values).forEach((key) => {
        data[key] = form.current.values[key].value;
      });
      return data;
    };

    const getFormState = () => formState.current;

    const setValues = (params: { [attr: string]: any }) => {
      Object.keys(params).forEach((key) => {
        form.current.values[key].value = params[key];
      });
      // 这里用户重新主动设置了表单某些字段的值，可能需要重新计算验证状态和依赖关系
      messageCenter.next(CHECK_ALL_RELATION_SHIP);
    };

    const setAttrs = (params: { [attr: string]: any }) => {
      Object.keys(params).forEach((key) => {
        form.current.values[key] = {
          ...form.current.values[key],
          ...params[key],
        };
      });
      // 这里用户重新主动设置了表单某些字段的值，可能需要重新计算验证状态和依赖关系
      // setState(Math.random());
      messageCenter.next(CHECK_ALL_RELATION_SHIP);
    };

    const triggerError = (params?: string[]) => {
      if (!params) {
        form.current.__msgs = form.current.__errors;
      } else {
        params.forEach((key) => {
          form.current.__msgs[key] = form.current.__errors[key];
        });
      }
      setState(Math.random());
    };

    formInstance.current = {
      Field,
      FormUnit,
      messageCenter,
      getValues,
      getFormState,
      setValues,
      setAttrs,
      getPureValues,
      triggerError,
    };
  }, []);

  return formInstance.current;
};
