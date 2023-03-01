import React from "react";


// 哪些方法会触发 react 重新渲染?
// setState、父组件重新渲染

// 重新渲染 render 会做些什么?
// 新旧 VNode 进行对比，也就是我们所说的Diff算法
// 新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
// 遍历差异对象，根据差异的类型，根据对应对规则更新VNode
// DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.


// React如何判断什么时候重新渲染组件？
// props改变、state改变、shouldComponentUpdate返回true

// React声明组件有哪几种方法，有什么不同？
// 1.无状态函数式组件 只负责展示，不涉及到state状态的操作 组件不会被实例化，整体渲染性能得到提升，不能访问this对象，不能访问生命周期的方法
// 2.E6继承形式 React.Component 有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法。
// 3.ES5 原生方式 React.createClass 不推荐。不好复用，和react不搭

// React中Fragment的理解，它的使用场景是什么？
// 组件返回的元素只能有一个根元素 不添加多余的DOM节点 Fragment标签不会渲染出任何元素

// React如何获取组件对应的DOM元素？
// 1.<p ref={ele => this.info = ele}></p>
// 2. this.ref = React.createRef()   <input ref={this.ref} />
// 
// useRef 仅能用在 FunctionComponent，createRef 仅能用在 ClassComponent。
// createRef 并没有 Hooks 的效果，其值会随着 FunctionComponent 重复执行而不断被初始化


// React中可以在render访问refs吗？为什么？
// 不可以 dom未生成


//对React的插槽(Portals)的理解，如何使用，有哪些使用场景？
//  节点渲染到存在于父组件以外的 DOM 节点   对话框，模态窗。


// 在React中如何避免不必要的render？
// shouldComponentUpdate 和 PureComponent （浅层对比 prop 和 state 组件的 props 和 state 均为基本类型时，使用React.PureComponent可以起到优化性能的作用。
// 如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果）
// Immutable is 对比
/// React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件
class ClassComponent extends React.Component {

    render() {
        return (
            <div>

            </div>
        )
    }
}