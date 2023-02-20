
// CommonJS和AMD输出的是对象 运行时确定模块的依赖关系及输入输出变量（即运行时加载），因此无法在编译时做“静态优化”
(function main (modules) {
    var installedModules = {};
    function _require(moduleId) {
        if (installedModules[moduleId]) { // 有缓存直接返回
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            id: moduleId, // id
            load: false, // 是否加载
            exports: { } // 模块的this绑定到这里
        }
        modules[moduleId].call(module.exports, module, module.exports, _require); // 递归调用 module.exports 被赋值
        module.load = true;
        return module.exports;
    }
    return _require('/index.js');
})({
    '/index.js': function (module, exports, _require) {
        const { myFunction, text } = _require("./module1.js")
        myFunction();
    },
    './module1.js': function (module, exports, _require) {
        // 这里面的逻辑，编译器是不参与的
        const myFunction = () => {
            console.log('这里是模块代码');
        }
        const text = 'test';
        exports = {
            myFunction,
            text
        }
    },
})





// es6 module
(function main (modules) {
    var installedModules = {};
    function _require(moduleId) {
        if (installedModules[moduleId]) { // 有缓存直接返回
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            id: moduleId, // id
            load: false, // 是否加载
            exports: { } // 模块的this绑定到这里
        }
        modules[moduleId].call(module.exports, module, module.exports, _require); // 递归调用 module.exports 被赋值
        module.load = true;
        return module.exports;
    }
    _require.definerGetter = function (exports, name, getter) {
        if (Object.prototype.hasOwnProperty.call(exports, name)) { // 判断name是不是exports自己的属性
            Object.defineProperty(exports, name, {enumerable: true, get: getter}); // 定义exports 上的getter
        }
    }
    _require.defineDesc = function (exports, name) {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            // Symbol.toStringTag作为对象的属性，值表示这个对象的自定义类型 [Object Module]
            // 通常只作为Object.prototype.toString()的返回值
            Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
          }
    
        Object.defineProperty(exports, '__esModule', {value: true}); // 标识这是一个module
    }

    return _require('/index.js');
})({
    '/index.js': function (module, exports, _require) {
        _require.defineDesc(exports);
        const { myFunction, text } = _require("./module1.js")
        myFunction();
    },
    './module1.js': function (module, exports, _require) {
        // 这里面是编译器参与的
        // 这里在编译过程中就知道导出了哪些东西
        _require.defineDesc(exports);
        _require.definerGetter(exports, "myFunction", function() { return myFunction }); 
        _require.definerGetter(exports, "text", function() { return text });

        var myFunction = () => {
            console.log('这里是模块代码');
        }
        var text = 'test';
        exports = {
            myFunction,
            text
        }
    },
})

// export default的导出方式，只会简单地把要导出的变量放在对象里，然后挂到 exports.default

// 但是与ES6 module  不同的是 ，CommonJS 模块同步加载并执行模块文件，ES6 模块提前加载并执行模块文件，ES6 模块在预处理阶段分析模块依赖，
// 在执行阶段执行模块，两个阶段都采用深度优先遍历，执行顺序是子 -> 父。

// 简单理解就是：把源码转化成文中提到的那个立即执行函数，就是编译的目的。
// 对于commonjs来说，webpack在处理模块导出的时候非常简单粗暴，就是把exports对象传进来，
// 让你自己往里面塞东西，然后它再把这个exports对象原封不动return出去，它没有参与这个过程，当然不会知道你会往这个对象里面塞什么东西啦；
// 但是对于es module来说，你所有要导出的东西，webpack都会调用一个函数来把他们一个一个挂到最终要导出的对象上，它当然知道这里面有什么东西啦。
// 这里的接口其实就是一个个getter。