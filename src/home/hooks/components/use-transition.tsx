import React, { useState, useTransition } from "react"

// 通过Fiber架构完成从递归遍历更新到循环遍历更新的跨越，让render阶段可中断； 递归遍历 -> 循环遍历   数据结构由 树 -> 链表

// 通过lane模型给不同任务事件添加优先级来定义任务的重要程度； 

// 事件优先级：
// 同步任务（click/change/input/blur...） > 连续触发事件任务(scroll/mousemove...) > setTimeout，请求更新任务 > 过渡任务（React18新特性）
// 调度优先级分为四种：

// 调度优先级：
// React根据lane模型来给不同的任务分配优先级
// Immediate：立即执行，最高优先级。
// render-blocking：会阻塞渲染的优先级，优先级类似 requestAnimationFrame。如果这种优先级任务不能被执行，就可能导致 UI 渲染被 block。
// default：默认优先级，普通的优先级。优先级可以理解为 setTimeout(0) 的优先级。
// idle：比如通知等任务，用户看不到或者不在意的
// 任务饥饿：
// 一个低优先级的任务一直被高优先级的任务插队，导致这个任务已经过了执行期限依然没有得到执行，在这种情况下，React会将该任务置为同步渲染任务，在下次更新时立即执行


// 通过scheduler完成任务分片执行和中断恢复；

export const UseTransition = () => { // 过渡任务
  const mockList1 = new Array(10000).fill('tab1').map((item, index) => item + '--' + index)
  const mockList2 = new Array(10000).fill('tab2').map((item, index) => item + '--' + index)
  const mockList3 = new Array(10000).fill('tab3').map((item, index) => item + '--' + index)

  const tab = {
    tab1: mockList1,
    tab2: mockList2,
    tab3: mockList3
  }

  const [active, setActive] = useState('tab1') //需要立即响应的任务，立即更新任务
  const [renderData, setRenderData] = useState(tab[active]) //不需要立即响应的任务，过渡任务
  const [isPending, startTransition] = useTransition()
  const handleChangeTab = (activeItem) => {
    setActive(activeItem) // 立即更新
    startTransition(() => { // startTransition 里面的任务优先级低
      setRenderData(tab[activeItem])
    })
  }
  return <div>
    <div className='tab' >
      {Object.keys(tab).map((item) => <span className={active === item && 'active'} onClick={() => handleChangeTab(item)} >{item}</span>)}
    </div>
    <ul className='content' >
      {isPending && <div> loading... </div>}
      {renderData.map(item => <li key={item} >{item}</li>)}
    </ul>
  </div>
}