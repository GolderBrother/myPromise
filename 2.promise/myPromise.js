    function Promise(executor) {
        const self = this;

        self.status = "pending";
        self.value = undefined;
        self.reason = undefined;

        self.onResolvedCallbacks = [];
        self.onRejectedCallbacks = [];

        function resolve(value) {
            if (self.status === "pending") {
                self.status = "fulfilled";
                self.value = value;
                self.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        function reject(reason) {
            if (self.status === "pending") {
                self.status = "rejected";
                self.reason = reason;
                self.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    }

    // promise2 就是当前then返回的promise
    // x就是当前then中成功或者失败回调的返回结果
    // 因为此方法 可能混着别人逻辑 所以尽可能考虑周全
    function resolvePromise(promise, x, resolve, reject) {
        // 对x进行判断 如果x是一个普通值 直接resolve就可以了
        // 如果x是一个promise 采用x的状态
        if (promise === x) {
            return reject(new TypeError("循环引用Prmose"))
        }
        let called;
        // 这种情况就有可能x 是一个promise了
        // x:  thenable || {then: ()=> {}}
        if (x !== null && (typeof x === "function" || typeof x === "object")) {
            try {
                // 看当前的promise有没有then方法 有可能取then的时候报错
                const then = x.then;
                // 这个逻辑可能是别人的promise 可能既能调用成功也会调用失败
                if (typeof then === "function") { //then是个函数，直接执行 thenable
                    // call x, 保证then里面的this指向x
                    then.call(x, val => {
                        if (!called) { // 不让用户既调用成功又调用失败
                            called = true;
                        } else {
                            return;
                        }
                        // y 可能还是一个常量，需要递归调用知道为一个位常量为止
                        resolvePromise(promise, y, resolve, reject);
                    }, reason => {
                        if (!called) {
                            called = true
                        } else {
                            return
                        }
                        reject(reason);
                    })
                    // 用刚才取出的then方法 不要再去取值了  如果在取可能又会发生异常
                } else { //then是个对象 ，then: () => {}
                    if (called) {
                        called = true;
                    } else {
                        return
                    }
                    resolve(x);
                }
            } catch (error) {
                if (called) {
                    called = true;
                } else {
                    return
                }
                reject(error)
            }
        } else { // 普通值，返回成功，并且把这普通值作为成功的结果
            resolve(x)
        }
    }

    // onfulfilled,onrejected 必须异步执行then 方法是异步的
    Promise.prototype.then = function (onfulfilled, onrejected) {
        const self = this;
        // 返回新的then， 让当前的then方法执行完后可以继续执行then方法
        let _promise = new Promise((resolve, reject) => {
            if (self.status === "fulfilled") {
                // 让当前代码在定时器执行，不在当前执行队列中执行
                // 为了拿到执行后的 _promise 值,需要在定时器中获取,否则_promise为undefined
                setTimeout(() => { // 放到定时器执行 保证 promise2 有值
                    try {
                        const x = onfulfilled(self.value);
                        resolvePromise(_promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (self.status === "rejected") {
                setTimeout(() => {
                    try {
                        const x = onrejected(self.reason);
                        resolvePromise(_promise, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (self.status === "pending") {
                self.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onfulfilled(self.value);
                            resolvePromise(_promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                self.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onrejected(self.reason);
                            resolvePromise(_promise, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })
        return _promise;
    }

    Promise.prototype.catch = function (errorFn) {
        // catch实际上就是特殊的then方法，只是onfulfilled函数为null，返回 errorFn 错误函数
        return this.then(null, errorFn);
    }
    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }
    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    Promise.prototype.finally = function (callback) {
        // 无论如何finally中传递的回调函数 必须会执行
        return this.then(data => {
            return Promise.resolve(callback()).then(() => data)
        }, reason => {
            return Promise.reject(callback()).then(() => {
                throw reason
            })
        })
    }

    // Promise.all 表示全部成功才成功 有任意一个失败 都会失败
    Promise.all = function (promises) {
        return new Promise((resolve, reject) => {
            let arr = [],
                currentIndex = 0;

            function processData(index, value) {
                arr[index] = value;
                currentIndex++;
                if (currentIndex === promises.length) {
                    resolve(arr)
                }
            }
            for (let i in promises) {
                promises[i].then((data) => {
                    processData(i, data)
                }, reject)
            }
        })
    }

    // rece赛跑
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            for (let i in promises) {
                // 并行执行then函数里面的回调，那个先返回结果就返回这个结果
                promises[i].then(resolve, reject)
            }
        })
    }


    // 没人用了
    Promise.defer = function () {
        let defer = {};
        defer.promise = new Promise((resolve, reject) => {
            defer.resolve = resolve;
            defer.reject = reject;
        })
        return defer;
    }


    module.exports = Promise;