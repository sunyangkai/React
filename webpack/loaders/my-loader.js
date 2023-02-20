const loaderUtils = require('loader-utils')
module.exports = function (source) {
    this.cacheable && this.cacheable(); // 开启缓存
    //  this.cacheable(false); // 关闭缓存
    // 获取到用户给当前 Loader 传入的 options
    const options = loaderUtils.getOptions(this)
    // 在这里按照你的需求处理 source
    return source.replace('this-is-javascript', 'this-is-typecript');


    // // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
    // var callback = this.async()
    // someAsyncOperation(source, function (err, result, sourceMaps, ast) {
    //     // 通过 callback 返回异步执行后的结果
    //     callback(err, result, sourceMaps, ast)
    // })

}