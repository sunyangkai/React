import React, { useInsertionEffect } from "react";



// useInsertionEffect 执行 -> useLayoutEffect 执行 -> useEffect 执行
export const UseInsertionEffect = () => { // useInsertionEffect 的执行的时候，DOM 还没有更新。本质上 useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题
    useInsertionEffect(() => {
      const style = document.createElement("style");
      style.innerHTML = `
           .css-in-js{
             color: pink;
             font-size: 12px;
           }
         `;
      document.head.appendChild(style);
    }, []);
    return (
      <div className="css-in-js"> useInsertionEffect使用场景 </div>
    )
  }