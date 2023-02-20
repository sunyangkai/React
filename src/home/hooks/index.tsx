import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import { State } from '../redux';
import { SET_LIST, SET_TITLE } from './reducer';
import { JAVASCRIPT_INCREMENT } from '../javascript/reducer';
import { Show } from 'src/common/show';
import { Comp } from './class';
import './index.less';


import {
  UseDeferredValue,
  UseImperativeHandle,
  UseInsertionEffect,
  UseLayoutEffect,
  UseReducer,
  UseState,
  UseTransition,
  UseMemo,
  UseContext
} from './components';



// import { New } from "./util/new";
// import { Old } from "./util/old";
// reac版本 〉16.8.0
// hooks: 系统运行到某一时期时，会调用被注册到该时机的回调函数。
// 在react中 “use” 作为开头的方法，它们提供了让你可以完全避开 class式写法，在函数式组件中完成生命周期、状态管理、逻辑复用等几乎全部组件开发工作的能力
// 状态逻辑复用
// 避免bind写法 为什么class要bind this？
// 渐进式改变， class里也能写hooks
/*
UI和数据分离更加彻底
状态逻辑复用，只会共享逻辑，不会共享数据
避免组件层层嵌套
数据流比高阶组件更加清晰，高阶组件的props往往不知道是那个高阶组件传来的
*/

// 



const Base = (props) => {
  return (
    <div className="hooks">
      <UseContext />
    </div>
  );
}

export default connect(
  (state: State) => {
    return {
      hooks: state.hooks.title
    }
  },
  (dispatch) => {
    return {
      setList: (list) => dispatch({ type: SET_LIST, list }),
      setTitle: (title) => dispatch({ type: SET_TITLE, title }),
      setNum: (num) => dispatch({ type: JAVASCRIPT_INCREMENT, num })
    };
  }
)(Base);




