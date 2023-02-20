import React, { createContext, memo, useContext, useMemo, useState } from 'react';


// 1.Context目前还处于实验阶段，可能会在后面的发行版本中有大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来较大影响和麻烦，不建议在App中使用Context。
// 2.尽管不建议在App中使用Context，但对于组件而言，由于影响范围小于App，如果可以做到高内聚，不破坏组件树的依赖关系，那么还是可以考虑使用Context的。
// 3.对于组件之间的数据通信或者状态管理，优先考虑用props或者state解决，然后再考虑用其他第三方成熟库解决的，以上方法都不是最佳选择的时候，那么再考虑使用Context。
// 4.Context的更新需要通过setState()触发，但是这并不是可靠的。Context支持跨组件访问，但是，如果中间的子组件通过一些方法不响应更新，比如shouldComponentUpdate()返回false，
// 那么不能保证Context的更新一定可达使用Context的子组件。因此，Context的可靠性需要关注。不过更新的问题，在新版的API中得以解决

const Context = createContext({
    contextStore: { count: 0, text: '' },
    setContextStore: null,
});


interface Props {
    text: string,
}
const Child = memo((props: Props) => {
    const { text } = props;
    return (
        <div >{text}</div>
    )
});

const ChildContext = () => { // 1.context发生变化的时候无论如何都会发生重新渲染。解决方案是 context 往上提，然后通过属性传递
    const { contextStore, setContextStore } = useContext(Context);
    console.log(contextStore)
    return (<Child text={contextStore.text} />);
}

export const UseContext = () => {
    const [contextStore, setContextStore] = useState({ count: 0, text: 'ggg' });
    // 2.如果 Provider 组件还有父组件，当 Provider 的父组件进行重渲染时，Provider 的value 属性每次渲染都会重新创建。解决方案是useMono缓存
    const contextValue = useMemo(() => ({ contextStore, setContextStore }), [contextStore, setContextStore]);
    return (
        <Context.Provider value={contextValue} >
            <div onClick={() => setContextStore({ ...contextStore, count: Math.random() })}>fahter</div>
            <ChildContext />
        </Context.Provider>
    )
}

