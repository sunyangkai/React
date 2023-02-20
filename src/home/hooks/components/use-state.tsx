import React, { useState } from "react";

// 于class组件，我们只需要实例化一次，实例中保存了组件的state等状态。对于每一次更新只需要调用render方法就可以。
// 但是在function组件中，每一次更新都是一次新的函数执行,为了保存一些状态,执行一些副作用钩子,react-hooks应运而生，去帮助记录组件的状态，处理一些额外的副作用



export const UseState = () => {
  // 1.在函数组件一次执行上下文中，state 的值是固定不变的。
  const [number, setNumber] = useState(2);
  const handleClick = () => {
    setInterval(() => {
      setNumber(number + 1);
      // setNumber(number => number + 1); // 拿到新值实现目的
    }, 1000);
  }

  // 2.如果两次 dispatchAction 传入相同的 state 值，那么组件就不会更新。这里的相同，内存地址要变化。=== 条件不成立
  const [state, dispatchState] = useState({ name: 'alien' })
  const handleClick2 = () => { // 点击按钮，视图没有更新。
    state.name = 'Alien'
    dispatchState(state) // 直接改变 `state`，在内存中指向的地址相同。

    // 3.当触发 dispatchAction 在当前执行上下文中获取不到最新的 state, 只有再下一次组件 rerender 中才能获取到。
    //  dispatchState({...state, name: 'Alien'})
    //  console.log(state)
  }

  return (
    <div>
      <button onClick={handleClick} > 1.点击 {number}</button>
      <button onClick={handleClick2} > 2.点击{state.name}</button>
    </div>
  )
}
