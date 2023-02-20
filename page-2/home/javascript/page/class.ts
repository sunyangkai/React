
// @ts-nocheck
export const class_test = () => {

//    class Person {
//        // 使用new 操作符 创建新实例 调用constructor
//        // 使用 new 操作符实例化 Person 的操作等于使用 new 调用其构造函数 new constructor();
//        // 过程：
//        // 1.内存中创建一个新对象 obj
//        // 2.obj.__proto__ = constructor.prototype
//        // 3. this => obj
//        // 4. construtor()
//        // 5. return obj; (如果要返回其它非空对象，则返回其它非空对象)
//        constructor() { 
//            console.log('ceate')
//        }

//    }


// 调用类构造和构造函数的区别：
// 1.调用类必须 使用new 操作符号，构造函数如果不用new 则会以全局 this 作为内部对象。
// 2. 类中定义的 constructor 方法不会被当成构造函数

// function Person(name) {
//     this.name = name;
// }

// const p = Person('Alice');
// console.log(p)

// 类是一种特殊的函数
// class Person {}
// console.log(typeof Person) // function
// console.log(Person.prototype) // {constructor: ƒ}
// // console.log(Person.prototype === Person.constructor) // false
// console.log(Person === Person.prototype.constructor) // true

}