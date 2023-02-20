import React, { useLayoutEffect, useState } from 'react';



export const UseLayoutEffect = () => {
    const [count, setCount] = useState(0);
    
    useLayoutEffect(() => { // DOM 更新之后，浏览器绘制之前 改为useEffect会闪烁卡顿
      if (count === 0) {
        const randomNum = 10 + Math.random()*200
        setCount(10 + Math.random()*200);
      }
    },    [count]);
  
    return (
        <div onClick={() => setCount(0)}>{count}</div>
    );
  }