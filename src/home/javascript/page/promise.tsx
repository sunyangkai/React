
// 我们都知道 Js 是单线程都，但是一些高耗时操作就带来了进程阻塞问题。为了解决这个问题，Js 有两种任务的执行模式：同步模式（Synchronous）和异步模式（Asynchronous)
// 在异步模式下，创建异步任务主要分为宏任务与微任务两种 宏任务是由宿主（浏览器、Node）发起的，而微任务由 JS 自身发起。
// 宏任务：setTimeout、setInterval、MessageChannel、I/O，事件队列、setImmediate（Node环境）
// 微任务：requestAnimationFrame、MutationObserver（浏览器环境）、Promise.[ then/catch/finally ]、process.nextTick（Node环境）、queueMicrotask
// EventLoop: 1. 执行最早入队列的宏任务。2.执行最早入队列的微任务，循环执行完所有队列里的微任务。3.重新渲染。
// 注意：新创建的微任务会立即进入微任务队列排队执行，不需要等待下一次轮回
// 

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class XPromise {
    constructor(executor) {
        executor(this.resolve, this.reject); // 立即执行 executor
    }
    fufillCallbacks = [];
    rejectCallbacks = [];
    status = PENDING;

    resolve = (value) => {

    }

    reject = (reason) => {

    }

    then = () => {

    }

}










class MPromisse {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(String(e));
        }
    }
    status = PENDING;
    value = null;
    reason = null;

    onFulfilledCallbacks = [];
    onRejectedCallbacks = [];

    static resolve(parameter) {
        // 如果传入 MyPromise 就直接返回
        if (parameter instanceof MPromisse) {
            return parameter;
        }

        // 转成常规方式
        return new MPromisse(resolve => {
            resolve(parameter);
        });
    }

    // reject 静态方法
    static reject(reason) {
        return new MPromisse((resolve, reject) => {
            reject(reason);
        });
    }

    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            while (this.onFulfilledCallbacks.length > 0) {
                this.onFulfilledCallbacks.shift()(value);
            }
        }
    }
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.reason = reason;
            while (this.onRejectedCallbacks.length > 0) {
                this.onRejectedCallbacks.shift()(reason);
            }

        }
    }
    resolvePromise = (x, resolve, reject) => {
        if (x instanceof MPromisse) {
            x.then(resolve, reject)
        } else {
            resolve(x);
        }
    }
    then = (onFulfiled, onReject = (value) => { }) => {
        const nextPromise = new MPromisse((resolve, reject) => {
            // 这里的内容在执行器中，会立即执行
            if (this.status === FULFILLED) {
                queueMicrotask(() => {
                try {
                    const x = onFulfiled(this.value);
                    this.resolvePromise(x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
                })
            } else if (this.status === REJECTED) {
                queueMicrotask(() => {
                try {
                    const x = onReject(this.reason);
                    this.resolvePromise(x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
                })
            } else if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    queueMicrotask(() => {
                    try {
                        const x = onFulfiled(this.value);
                        this.resolvePromise(x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                    })
                });
                this.onRejectedCallbacks.push(() => {
                    queueMicrotask(() => {
                    try {
                        const x = onReject(this.reason);
                        this.resolvePromise(x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                    })
                });
            }
        })

        return nextPromise;
    }
}

export const promise_test = () => {
    // const p = new MPromisse((resolve, reject) => {
    //     throw new Error('执行器错误')
    // });
    // const p = new MPromisse((resolve, reject) => {
    //    console.log(0)
    //    setTimeout(() => {
    //       resolve(1);
    //    }, 1000)
    // });


    // p.then((res) => {
    //     console.log(res);
    //     // throw new Error('then error')
    //     return 2;
    // }, (e) => {
    //     console.log('error')
    //     console.log(e)
    // }).then((res) => {
    //     console.log(res)
    // }, (e) => {
    //     console.log(4, e)
    // })


    MPromisse.resolve().then(() => {
        console.log(0);
        return MPromisse.resolve(4);
    }).then((res) => {
        console.log(res)
    })

    MPromisse.resolve().then(() => {
        console.log(1);
    }).then(() => {
        console.log(2);
    }).then(() => {
        console.log(3);
    }).then(() => {
        console.log(5);
    }).then(() => {
        console.log(6);
    })


}