export const test_function = () => {
  // ECMAScript 中所有函数的参数都是按值传递的， 不是引用。尽管有时候表现得像引用
  // 意思是函数的参数会被 复制 到 函数内部

  // let obj = { name: 1 };
  // function setName(o) {
  //     o.name = '22';
  // }
  // setName(obj);
  // console.log(obj) // {name: '22'}

  // function setName2(bj) {
  //     bj.name = 'hh'
  //     bj = { age: '33' } // 本地对象在函数执行结束时就被销毁了。
  // }
  // setName2(obj)
  // console.log(obj)

  // typeof 操作符最适合用来判断一个变量是否为原始类型
  // typeof 虽然对原始值很有用，但它对引用值的用处不大
  // const a = '22';
  // const b = 22;
  // const c = true;
  // const d = null;
  // let e;
  // const f = {}
  // console.log(typeof a, typeof b, typeof c, typeof d, typeof e, typeof f)
  // // string number boolean object undefined object

  // // 如果变量是给定引用类型（由其原型链决定）的实例
  // // 按照定义，所有引用值都是 Object 的实例，因此通过 instanceof 操作符检测任何引用值和Object 构造函数都会返回 true
  // console.log([2, '33'] instanceof Array) // true
  // console.log([2, '33'] instanceof Object) // true


  // 局部作用域中定义的变量可用于在局部上下文中替换全局变量  是因为可以在作用域链中找到它
  // 函数参数被认为是当前上下文中的变量，因此也跟上下文中的其他变量遵循相同的访问规则
  // 执行上下文主要有全局上下文和函数上下文两种（eval()调用内部存在第三种上下文）
  // 某些语句会导致在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除 try/catch 语句的 catch 块 with语句
//   var color = 'blue'
//   function changeColor() {
//     let anotherColor = 'red'
//     function swapColors() {
//       let tempColor = anotherColor
//       anotherColor = color
//       color = tempColor
//       // 这里可以访问 color、anotherColor 和 tempColor
//     }
//     // 这里可以访问 color 和 anotherColor，但访问不到 tempColor
//     swapColors()
//     console.log(color, anotherColor) // red blue
//   }
//   // 这里只能访问 color
//   changeColor()
// 


// function buildUrl() { 
//     let qs = "?debug=true"; 
//     with(location){ 
//     let url = href + qs; 
//     } 
//     return url;
// }

// 而在 with 语句中使用 var 声明的变量 url 会成为函数
// 上下文的一部分，可以作为函数的值被返回；但像这里使用 let 声明的变量 url，因为被限制在块级作
// 用域（稍后介绍），所以在 with 块之外没有定义











}
