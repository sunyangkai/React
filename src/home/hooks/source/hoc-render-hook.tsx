import React, { ReactElement, useEffect, useState } from "react";



const Button = (props) => {
    const { list, name } = props;
    return (
        <div>
            <div>{name}</div>
            {
                list.map(li => (
                    <span>{li}</span>
                ))
            }
        </div>
    )
}


// 高阶组件（HOC）就是一个函数，且该函数接受一个组件(加上其它参数)作为参数，并返回一个新的组件，它只是一种组件的设计模式，
// 逻辑服用、不影响被包裹组件的内部逻辑。
// 利用高阶组件的 条件渲染 特性可以对页面进行权限控制，权限控制一般分为两个维度：页面级别和 页面元素级别
// hoc传递给被包裹组件的props容易和被包裹后的组件重名，进而被覆盖
const HocButton = (Button, getList) => {
    return (props) => {
        const [list, setList] = useState([]); // 复用获取数据逻辑
        useEffect(() => {
            getList().then(res => {
                setList(res);
            })
        }, []);
        return (
            <div>
                <span>附加的内容</span>
                <Button {...props} list={list} /> 
            </div>// 复用button渲染逻辑
        )
    }
}

// render props
// 数据共享、代码复用，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。
// 可能产生嵌套地狱

interface Props {
    getList: () => Promise<(string|number)[]>,
    render: (list: (string|number)[]) => ReactElement,
}
class RenderProps extends React.Component<Props> {
    state = {
        list: []
    }    
   componentDidMount() {
    const {  getList } = this.props;
    getList().then(res => {
        this.setState({ list: res })
    })
   }
   render() {
        const {  render } = this.props;
        return (
            <div>
                <span>附加的内容</span>
                { render(this.state.list) }
            </div>
        )
   }
}


// 解决hoc的prop 重名问题；
// 解决render props 因共享数据 而出现嵌套地狱的问题
// 状态逻辑复用
// 对生命周期的实现更为合理 useEffect 合并了 componentDidMount/componentDidUpdate
const useButtonList = (getList) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        getList().then(res => {
            setList(res);
        })
    }, []);
    return [list];

}

const HookButton = (props) => {
    const { getList, name } =  props;
    const [ list ] = useButtonList(getList);
    return (
        <div>
               <span>附加的内容</span>
               <Button name={name} list={list} />
        </div>
    )
}

export const HocRenderHook = () => {
    const getList = () => {
        return Promise.resolve(['1', '3', 'Alice', 5]);
    }
    const Target = HocButton(Button, getList);
    return (
       <div>
         <Target name="HOC" />
         <RenderProps getList={getList} render={(list) => <Button list={list} name="render" />} />
         <HookButton name="HOOK" getList={getList}  />
       </div>
    )
}