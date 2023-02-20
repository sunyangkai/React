import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';

interface Props {
    onChange: (v: any) => void;
}
const Child = memo((props: Props) => { // memo 是为了防止组件在 props 没有变化时重新render
    const { onChange } = props;
    useEffect(() => {
        console.log('rebuild child')
    }, []);
    console.log('render child')
    return (
        <input onChange={onChange} />
    )
})

export const UseMemo = () => {
    const [num, setNum] = useState(0);
    // const source = {
    //     name: 'Amelia'
    // };
    const source = useMemo(() => { // 缓存引用类型依赖
        return {
            name: 'Amelia'
        }
    }, []);

    useEffect(() => {
        console.log('souce-change:', source);
    }, [source]);

    const handdleChange = useCallback((v) => { // 引用类型
        console.log(v)
    }, [])

    return (
      <div>
          <div onClick={() => {
            setNum(Math.random());
        }}>{source.name}:{num}</div>
        <Child onChange={handdleChange} />
      </div>
    )
}
