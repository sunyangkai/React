// @ts-nocheck
export const test_undefined = () => {
  // Undefined 类型只有一个值，就是特殊值 undefined。当使用 var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了 undefined 值
  const getVar = () => {}
  let a
  console.log(a) // undefined
  console.log(getVar()) // undefined
  // console.log(b) err: Cannot find name 'b';
}

export const test_null = () => {
  // null 表示空对象指针
  let car = null
  console.log(typeof car) // object
  // 在定义将来要保存对象值的变量时，建议使用 null 来初始化，不要使用其他值。这样，只要检查这个变量的值是不是 null 就可以知道这个变量是否在后来被重新赋予了一个对象的引用
}

export const test_boolean = () => {
  console.log(Boolean('test'), Boolean('')) // true false
  console.log(Boolean(1), Boolean(Infinity), Boolean(0), Boolean(NaN)) // true true false false
  console.log(Boolean({}), Boolean(null)) // true false
  console.log(Boolean(undefined)) // false

  // 像 if 等流控制语句会自动执行其他类型值到布尔值的转换
}

export const test_number = () => {
  // 浮点运算误差  放大计算解决
  console.log(0.1 + 0.2 === 0.3) // false
  // 内存限制 最大值 最小值
  console.log(Number.MAX_VALUE, Number.MIN_VALUE) // Infinity  -Infinity
  // 确定一个值是不是有限大 isFinite() 在计算非常大或非常小的数值时，有必要监测一下计算结果是否超出范围

  // Not a Number
  console.log(0 / 0, 5 / 0) // NaN Infinity

  console.log(
    Number(true),
    Number(false),
    Number(10),
    Number(null),
    Number(undefined)
  )
  // 1 0 10 0 NaN
  console.log(
    Number('123'),
    Number('011'),
    Number('0.11'),
    Number(0xf),
    Number(''),
    Number('test')
  )
  // 123 11 0.11 15 0 NaN

  console.log(parseInt('10', 2), parseInt('10', 16)) // 2 16

  /*
    它始终忽略字符串开头的零。十六进制数值始终会返回 0。因为parseFloat()只解析十进制值，因此不能指定底数。
    最后，如果字符串表示整数（没有小数点或者小数点后面只有一个零），则 parseFloat()返回整数
    解析到字符串末尾或者解析到一个无效的浮点数值字符为止
    */
  console.log(parseFloat('22.34.5'), parseFloat('1234blue'), parseFloat('0xA'))
  // 22.34 1234 0
}

export const test_string = () => {
  let num = 10
  console.log(num.toString(2)) // 1010
}

export const test_symbol = () => {
  // const obj = {};
  // const name = Symbol('name');
  // const age = Symbol('age');
  // console.log(age.toString())
  // const sex = 'sex';
  // obj[name] = 'Amelia';
  // obj[age] = 18;
  // obj[sex] = 'famele';
  // console.log(
  //     Object.keys(obj),
  //     Reflect.ownKeys(obj),
  //     Object.getOwnPropertyNames(obj),
  //     Object.getOwnPropertySymbols(obj),
  //     Object.getOwnPropertyDescriptors(obj)
  // )

  // 这个属性定义在 Function 的原型上，因此默认在所有函数和类上都可以调用
  // function Foo() {}
  // const f = new Foo();
  // console.log(Foo[Symbol.hasInstance](f))

  // class Bar {
  //     static [Symbol.hasInstance]() {
  //         return false;
  //     }
  // }
  // const bar = new Bar();
  // console.log(bar instanceof Bar)

  // Array.prototype.concat()方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例。覆盖 Symbol.isConcatSpreadable 的值可以修改这个行为。
  /*
    const init = [1];
    const next = { length: 1, 0: 3 };
    next[Symbol.isConcatSpreadable] = true;
    // @ts-ignore
    console.log(init.concat(next))
    */

  // 可迭代的   (iterable protocol:如果一个对象有[Symbol.iterator]属性，并且该属性的value是一个迭代器（iterator），那么这个对象是可迭代的(iterable)
  // 迭代器  (iterator protocol:如果一个对象内部有一个next方法，该方法是无参的，并返回一个有value属性和done属性的对象，那么这个对象是一个迭代器

  //   let items = {
  //     index:0,
  //     max: 5,
  //     next: function() { // 返回调用结果
  //         this.index++;
  //       if (this.index < this.max) {
  //           return { value: this.index, done: false }
  //       } else {
  //           return { value: this.index, done: true }
  //       }
  //     }
  //   }

  //   let res = { done: false  };
  //   while (!res.done) {
  //       res = items.next();
  //       console.log(res)
  //   }

  //   class Fruit {
  //       constructor(max) {
  //           this.max = max;
  //           this.index = 0;
  //       }
  //       *[Symbol.iterator]() {
  //           while(this.index < this.max) {
  //               yield this.index++;
  //           }
  //       }
  //   }
  //   console.log('test')
  //   const fruits = new Fruit(5);
  //   for(const f of fruits) {
  //       console.log(f)
  //   }

  //   function* generator(){
  //     // console.log('1')
  //     yield 1
  //     // console.log('2')
  //     yield 2
  //     // console.log('3')
  //     yield 3
  //   }

  //   let generator_obj = generator()
  //   for (let i of generator_obj) {
  //     console.log(i) // 1 2 3
  //   }

  //  const obj = {
  //      a: 1,
  //      b: 2
  //  }

  //  for (const o in obj) { // 用于枚举对象中的非符号键属性
  //      console.log(o)
  //  }

  // 在使用 var 声明变量时，变量会被自动添加到最接近的上下文。
  // function add(num1, num2) {
  //     var sum = num1 + num2;
  //     return sum;
  //    }
  //    let result = add(10, 20); // 30
  //    console.log(sum); // 报错：sum 在这里不是有效变量
  // }

  // function add(num1, num2) {
  //     sum = num1 + num2;
  //      return sum;
  //     }
  //     let result = add(10, 20); // 30
  //     console.log(sum); // 30
  // }

  // 这一次，变量 sum 被用加法操作的结果初始化时并没有使用 var 声明。在调用 add()之后，sum
  // 被添加到了全局上下文，在函数退出之后依然存在，从而在后面可以访问到

  // var 声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升”

  // console.log(name); // undefined
  // var name = 'Jake';
  // function() {
  //  console.log(name); // undefined
  //  var name = 'Jake';
  // }

  // ES6 新增的 let 关键字跟 var 很相似，但它的作用域是块级的，这也是 JavaScript 中的新概念。块
  // 级作用域由最近的一对包含花括号{}界定。换句话说，if 块、while 块、function 块，甚至连单独
  // 的块也是 let 声明变量的作用域。

//   if (true) {
//     let a
//   }
//   console.log(a) // ReferenceError: a 没有定义
//   while (true) {
//     let b
//   }
//   console.log(b) // ReferenceError: b 没有定义
//   {
//     let d
//   }
//   console.log(d) // ReferenceError: d 没有定义


// let 与 var 的另一个不同之处是在同一作用域内不能声明两次。重复的 var 声明会被忽略，而重
// 复的 let 声明会抛出 SyntaxError。

// let 的行为非常适合在循环中声明迭代变量。使用 var 声明的迭代变量会泄漏到循环外部，这种情况应该避免

// 严格来讲，let 在 JavaScript 运行时中也会被提升，但由于“暂时性死区”, ，实际上不能在声明之前使用 let 变量
// 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

// 使用 const 声明的变量必须同时初始化为某个值
// const a; // SyntaxError: 常量声明时没有初始化

// const 除了要遵循以上规则，其他方面与 let 声明是一样的
// 赋值为对象的 const 变量不能再被重新赋值为其他引用值，但对象的键则不受限制。
// 如果想让整个对象都不能修改，可以使用 Object.freeze()，这样再给属性赋值时虽然不会报错，但会静默失败
// const o3 = Object.freeze({}); 
// o3.name = 'Jake'; 
// console.log(o3.name); // undefined


// 垃圾回收策略 标记清理 、 引用计数

// 标记清理(最普遍)， 进入上下文的变量会被标记存在，退出上下文标记退出 （标记方式多种，如反转位、维护两个列表)
// 引用计数，赋值引用+1，覆盖引用-1， 会产生循环引用问题。

// 将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行

// 如何利用垃圾回收机制提升性能？
// 1.代码时只保存必要的数据。如果数据不再必要，那么把它设置为 null，
// 解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关
// 的值已经不在上下文里了，因此它在下次垃圾回收时会被回收。

// 2. const let 块级作用域 可能会更早地让垃圾回收程序介入。在块作用域比函数作用域更早终止的情况下，这就有可能发生。

// 3.隐藏类V8引擎 
// function Person() {}
// const p1 = new Person();
// const p2 = new Person();
// p2.name = 'p2'; 
// Person 实例就会对应两个不同的隐藏类


// function Person(name) {
//     this.name = name;
// }
// const p1 = new Person();
// const p2 = new Person('p2');
// Person 实例共用隐藏类
// delete p2.name // Person 实例就会对应两个不同的隐藏类
// 正确的做法是 p2.name = null;

// 4.局部变量提升
// 5.定时器
// let name = 'Jake'; 
// setInterval(() => { 
//     console.log(name); 
//    }, 100);
// }
// 6.闭包
// let outer = function() { 
//     let name = 'Jake'; 
//     return function() { 
//     return name; 
//     }; 
//    };


//7. 浏览器决定何时运行垃圾回收程序的一个标准就是对象更替的速度。如果有很多对象被初始化，然
// 后一下子又都超出了作用域，那么浏览器就会采用更激进的方式调度垃圾回收程序运行
// function Person(name) { this.name = name }
// function setPerson (age) {
//     let p = new Person('章三' + i);
//     p.age = age;
//     return p;
// }
// const person = [];
// for (let i = 0; i < 10000; i++) {
//     person.push(setPerson(i));
// }

// // dosomething()
// person.length = 0;

// 解决办法： 创建对象池，动态分配。
// 可以创建一个足够大的数组来维护, 避免 arr  = new Array(100)。 长度不够，又要arr.push()。
// 这时候js会删除原来的数组 重新分配一个 200的数组

// 静态分配是优化的一种极端形式。如果你的应用程序被垃圾回收严重地拖了后腿，
// 可以利用它提升性能。但这种情况并不多见。大多数情况下，这都属于过早优化，因此不
// 用考虑。



}


export const test_obj = () => {
    // object 发生隐试转换时会调用valueOf方法
    // const a = {
    //     num: 0,
    //     valueOf: function() {
    //         this.num++;
    //         return this.num;
    //     }
    // }
    // if (a == 1 && a==2 && a==3) {
    //     console.log("done")
    // }
}
