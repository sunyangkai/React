import { ReactElement } from 'react';
export const STATUS = {
  success: 1,
  failed: 2,
  pending: 0,
};

export const ASYNC_STATUS = {
  new: 1,
  old: 0,
};

export const CHECK_ALL_RELATION_SHIP = 'danymic_check_all_relationship';

export interface FiledValue {
  value: any;
  [attr: string]: any;
}

export interface InitValue {
  [attr: string]: FiledValue;
}

export interface IDynamicFormProps {
  initValue: InitValue;
  checkRelationship?: boolean;
}

export interface FormState {
  isValid: boolean;
}

export type AsyncValue = (resolve: (v: FiledValue) => void, reject: (v: FiledValue) => void) => Promise<any>;

export type Relier = (
  get: (name: string) => FiledValue | AsyncValue,
  currentFiled: FiledValue,
  updateForm: (val: FiledValue) => void,
  key: string,
) => FiledValue;

export type syncValidator = (v: any, values: any) => boolean;

export type asyncValidator = (
  v: any,
  values: any,
) => (resolve: General.AnyFunction, reject: General.AnyFunction) => void;
export interface IValidator {
  validator: syncValidator | asyncValidator;
  msg?: string;
  pending?: string;
}
export interface FiledProps {
  id: string;
  hide?: boolean;
  defaultValue?: any;
  relier?: Relier | [Relier, string[]];
  filter?: (v: any) => any;
  validators?: IValidator[];
  debounce?: number;
  render: (props: { filedValue: FiledValue; onChange: (v: any) => void; messages: string[] }) => ReactElement;
}

export interface FormUnit {
  render: (props: { isValid: boolean }) => ReactElement;
}
export interface FormInstance {
  messageCenter: any;
  Field: (props: FiledProps) => ReactElement;
  FormUnit: (props: FormUnit) => ReactElement;
  getValues: () => InitValue;
  getFormState: () => FormState;
  setValues: (params: { [attr: string]: any }) => void;
  setAttrs: (params: { [attr: string]: any }) => void;
  getPureValues: () => { [attr: string]: any };
  triggerError: (p?: string[]) => void;
}
