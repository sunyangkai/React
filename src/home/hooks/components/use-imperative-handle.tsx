import React, { forwardRef, useImperativeHandle, useRef } from "react";


// forwardRef 可以在父组件中操作子组件的 ref 对象
// forwardRef 可以将父组件中的 ref 对象转发到子组件中的 dom 元素上
// 子组件接受 props 和 ref 作为参数
const Child = forwardRef((props, ref) => { // 因为函数组件没有实例，所以函数组件无法像类组件一样可以接收 ref 属性
  // useRef 返回的 ref 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的ref 对象都是同一个
  // 使用 React.createRef ，每次重新渲染组件都会重新创建 ref
  const inputRef = useRef<HTMLInputElement>();
  // useImperativeHandle可以让你在使用 ref 时，自定义暴露给父组件的实例值，不能让父组件想干嘛就干嘛
  // useImperativeHandle 应当与 forwardRef 一起使用
  // 父组件可以使用操作子组件中的多个 ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }))
  return (
    <input ref={inputRef} type="text" />
  )
});

export const UseImperativeHandle = () => {
  const nodeRef = useRef<{ focus: Function }>();
  const setJsTitle = () => {
    nodeRef.current.focus();
  }
  return (
    <div>
      <Child ref={nodeRef} />
      <span className='pointer' onClick={setJsTitle}>
        设置数量
      </span>
    </div>
  )
}