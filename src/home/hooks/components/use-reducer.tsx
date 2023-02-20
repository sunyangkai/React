// 页面轻量不用redux的时候用这个
// usereducer可以合context配合使用达到redux功能，但是有性能缺陷，引发不必要的渲染

import React, { useReducer } from "react"

export const UseReducer = ()=>{
    const [ number , dispatchNumbner ] = useReducer((state,action)=>{
        const { payload , name  } = action
        switch(name){
            case 'add':
                return state + 1
            case 'sub':
                return state - 1 
            case 'reset':
              return payload       
        }
        return state
    },0)
    return <div>
       当前值：{ number }
       { /* 派发更新 */ }
       <button onClick={()=>dispatchNumbner({ name:'add' })} >增加</button>
       <button onClick={()=>dispatchNumbner({ name:'sub' })} >减少</button>
       <button onClick={()=>dispatchNumbner({ name:'reset' ,payload:666 })} >赋值</button>
       { /* 把dispatch 和 state 传递给子组件  */ }
    </div>
   }
   