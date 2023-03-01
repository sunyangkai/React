
import React from "react";

// DOM事件流（event flow ）存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段
// element.addEventListener(event, function, useCapture = false); 冒泡阶段调用事件处理函数：false 事件捕获阶段调用处理函数: true
// 事件冒泡（dubbed bubbling）：当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到 window


// 在原生事件中，可以通过返回 false 方式来阻止默认行为，但是在 React 中，需要显式使用 preventDefault() 方法来阻止
// 合成事件和原生事件不要混用，原生事件中如果执行了stopPropagation方法，则会导致其他React事件失效
export const ReactEvent = () => {
    // React-16版本中的事件池：每次我们用的事件源对象，在事件函数执行之后，可以通过releaseTopLevelCallbackBookKeeping等方法将事件源对象释放到事件池中，
    // 这样的好处每次我们不必再创建事件源对象，可以从事件池中取出一个事件源对象进行复用，
    // 在事件处理函数执行完毕后,会释放事件源到事件池中，清空属性，这就是setTimeout中打印为什么是null的原因了


    // React-17  事件统一绑定container上而不是document上。利于微前端的，微前端一个前端系统中可能有多个应用
    // 对齐原生浏览器事件 支持了原生捕获事件的支持 onScroll 事件不再进行事件冒泡 
    // 
    const handerClick = (e) => {
        console.log('handerClick')
        // e.persist() React-16 需要在事件处理函数运行之后获取事件对象的属性时使用
        setTimeout(() => {
            console.log('目标:', e.target) // React-16会打印null。使用e.persist()获取保留数据
        }, 100);
    }
    return (
        <div>
            <button onClick={ handerClick } > 按钮点击 </button>
        </div>
    )
}