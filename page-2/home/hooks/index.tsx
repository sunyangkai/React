import React, { forwardRef, useImperativeHandle, useRef }  from 'react'
import { connect } from 'react-redux'


import { State } from '../redux'
import { SET_LIST, SET_TITLE } from './reducer'
import { JAVASCRIPT_INCREMENT } from '../javascript/reducer'
import './index.less'

// import { New } from "./util/new";
// import { Old } from "./util/old";
/*
UI和数据分离更加彻底
状态逻辑复用，只会共享逻辑，不会共享数据
避免组件层层嵌套
数据流比高阶组件更加清晰，高阶组件的props往往不知道是那个高阶组件传来的
*/

const Child = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return (
    <input ref={inputRef} type="text" />
  )
})
const Base = (props) => {
  const nodeRef = useRef<{ focus: Function }>();

  const setTitle = () => {
    props.setTitle('更换标题')
  }
  const setJsTitle = () => {
    props.setNum(122)
    nodeRef.current.focus();

  }

  return (
    <div className='hooks'>
      {/* <Old extraTitle="副标题" />
            <New extraTitle="副标题" /> */}
      <Child ref={nodeRef} />
      <span className='pointer' onClick={setTitle}>
        设置标题
      </span>
      <span className='pointer' onClick={setJsTitle}>
        设置数量
      </span>
    </div>
  )
}

export default connect(
  (state: State) => {
    return {
      hooks: state.hooks.title,
    }
  },
  (dispatch) => {
    return {
      setList: (list) => dispatch({ type: SET_LIST, list }),
      setTitle: (title) => dispatch({ type: SET_TITLE, title }),
      setNum: (num) => dispatch({ type: JAVASCRIPT_INCREMENT, num }),
    }
  }
)(Base)




