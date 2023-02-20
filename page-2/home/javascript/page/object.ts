// @ts-nocheck
export const test_object = () => {
  // const obj = {};
  // Object.defineProperties(obj, {
  //     name: {
  //         value: 'Alice',
  //         writable: true,
  //         configurable: false,
  //         enumerable: true
  //     },
  //     age: {
  //         value: 18,
  //         writable: true,
  //         configurable: false,
  //         enumerable: true,
  //         get(){
  //             return this.age;
  //         },
  //         set(val) {
  //             this.age = val;
  //         }
  //     }
  // });

  // Object.getOwnPropertyDescriptor(obj, age)方法可以取得指定属性的属性描述符

  //   var obj1 = {
  //     set age(val) {
  //       console.log('set', val)
  //     },
  //   }
  //   var obj2 = {
  //     age: 1,
  //     get age() {
  //       return this.age
  //     },
  //   }
  //   var obj3 = { name: 'alice' }
  //   const res = Object.assign(obj1, obj2, obj3)
  //   console.log(res === obj1) // true
  // }

  //   let dest = {
  //     set a(val) {
  //       console.log(`Invoked dest setter with param ${val}`)
  //     },
  //   }
  //   let src = {
  //     get a() {
  //       console.log('Invoked src getter')
  //       return 'foo'
  //     },
  //     get b() {
  //         return 'here'
  //     }
  //   }
  //   let src2 = { ss: 'ss'}
  //   console.log(Object.getOwnPropertyDescriptor(src, 'a'))
  //   console.log(Object.values(src))
  //   Object.assign(dest, src, src2 )

  //  Object.assign()没办法回滚已经完成的修改

  // 要确定 NaN 的相等性，必须使用极为讨厌的 isNaN()
  // console.log(NaN === NaN); // false
  // console.log(isNaN(NaN)); // true

  // ECMAScript 6 规范新增了 Object.is()，这个方法与===很像，但同时也考虑到了上述边界情形
  // console.log(Object.is(-0, 0)); // false
  // console.log(Object.is(NaN, NaN)); // true

  // 创建对象
  // 1. 工厂模式
  //  function createPerson(name ,age) {
  //      let p = new Object();
  //      p.name = name;
  //      p.age = age;
  //      p.say = function () {
  //          console.log('hello')
  //      }
  //      return p;
  //  }
  //  // 可以解决创建多个类似对象的问题，但没有解决对象标识问题（即新创建的对象是什么类型）
  //  // 2.构造函数
  //  function Person(name, age) {
  //     this.name = name;
  //     this.age = age;
  //     this.say = function() {
  //         console.log('hello')
  //     }
  //  }
  //  let p1 = new Person('p1', 17);
  // //  let p2 = new Person('p2', 18);
  //  console.log(p1.say())
  // 没有显式地创建对象
  // 大写开头，构造函数不是普通函数，是能够产生对象的函数。默认return this；除非你return一个其他对象。return null string 都是无效的。
  // 创造一个新对象，对象的__proto__被赋值为构造函数的prototype
  // 构造函数内部this被赋值为这个创造出来的新对象 （this指向新对象)
  // 执行构造函数内部代码（this赋值各种属性)
  // return this(新对象)；如果你return一个其它对象，则return你的对象。

  // 构造出来的对象都有一个constructor指向构造函数Person
  //  console.log(p1.constructor === Person) // true

  //  构造函数不一定要写成函数声明的形式。赋值给变量的函数表达式也可以表示构造函数：
  // let Person = function(name, age, job) {
  //  this.name = name;
  //  this.age = age;
  //  this.job = job;
  //  this.sayName = function() {
  //  console.log(this.name);
  //  };
  // }

  // 不想传参数，那么构造函数后面的括号可加可不加 let person2 = new Person;
  // 任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数 let p = new person('alcie', 19)

  // 构造函数的问题：创建的所有实例中的方法都是重复创建，不共享。浪费
  // 3. 原型 (使用函数表达式也可以)
  //  创建函数，都会创建一个prototype属性，proto都会自动获得一个constructor属性指向构造函数
  //  function Person(name, age) {
  //      this.name = name;
  //      this.age = age
  //  };
  //  Person.prototype = {
  //      say() {
  //          console.log(this.name)
  //      }
  //  }

  //  const p1 = new Person('alice', 23)
  //  p1.say()

  // isPrototypeOf()方法检测木目标的原型是不是调用对象
  //  console.log(Person.prototype.isPrototypeOf(p1)) // true
  //  console.log(Object.getPrototypeOf(p1).say)
  // getPrototypeOf 获取对象原型
  // setPrototypeOf可以直接修改对象的__proto__，进而改变原形链的继承关系

  // let o1 = {
  //     name: '01'
  // }
  // let o2 = {
  //     age: 18
  // }
  // Object.setPrototypeOf(o2, o1);
  // console.log(Object.getPrototypeOf(o2))
  // console.log("name" in person1)
  // hasOwnProperty() 只有属性存在于实例上时才返回 true
  // hasPrototypeProperty() 只有属性存在于原型上时才返回 true

  // 1.原型继承  问题：1.实例共享原型中的引用值 2.子类构造不能向父类构造函数传参
  // 2.盗用构造函数 call apply
  // 问题：1.函数属性不能重用，每次都是新的实例新的函数
  // 2. 没有继承关系的原型链，子类不能访问父类的原型
  // function Father(name, colors) {
  //     this.name = name;
  //     this.colors = colors;
  // }
  // Father.prototype = {
  //     say: function() {
  //         console.log('my name is' + this.name)
  //     }
  // }

  // function Son(name, colors, age) {
  //     Father.call(this, name, colors);
  //     this.age = age;
  // }

  // const f = new Father('baba', ['blue, red']);
  // const s = new Son('son', ['black, green'], 16);
  // console.log(f)
  // f.say();
  // s.say()

  // 3.组合继承
  //   function Father(name, colors) {
  //     this.name = name
  //     this.colors = colors
  //   }
  //   Father.prototype = {
  //     say: function () {
  //       console.log('my name is' + this.name)
  //     },
  //   }
  // 存在效率问题， 父类构造函数会被调用两次

  //   function Son(name, colors, age) {
  //     Father.call(this, name, colors)
  //   }
  //   Son.prototype = new Father()
  //   const f = new Father('baba', ['blue, red'])
  //   const s = new Son('son', ['black, green'], 16)
  //   f.say()
  //   s.say()

  // 4.原型继承
  // 非常适合对象之间共享信息, 且不需要构造函数创建
  // 和原型链继承有相同的问题, 原型对象的引用属性会被多个实例共享
//   const father = {
//     name: 'father',
//     colors: ['blue'],
//     say: function () {
//       console.log(this.colors)
//     },
//   }

//   const son1 = Object.create(father, {
//     sing: {
//       value: function () {
//         console.log(' sing my name: ' + this.name)
//       },
//     },
//     play: {
//       value: function (color) {
//         this.colors.push(color)
//       },
//     },
//   })
//   const son2 = Object.create(father, {
//     shot: {
//       value: function () {
//         console.log('i can shot:' + this.name)
//       },
//     },
//     create: {
//       value: function (color) {
//         this.colors.push(color)
//       },
//     },
//   })
//   son1.play('white')
//   son2.create('black')
//   father.say()

// 5.寄生

// function createSon(obj, attr = {}) {
//     const clone = {...obj};
//     return {
//         ...clone,
//         ...attr
//     };
// }

// const father = {
//     name: 'father',
//     say: function() {
//         console.log(this.name)
//     }
// }

// const son1 = createSon(father, {
//     sing: function() {
//         console.log('sing my name', this.name)
//     }
// })

// son1.say();
// son1.sing();






}
