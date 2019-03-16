const myPromise = require("./myPromise");
let promise = new myPromise((resolve, reject) => {
    setTimeout(() => {
        reject("失败")
    }, 1000)
    // 如果下面Promise决议成功了，上面的虽然会执行，但是改变不了状态了
    resolve("成功")
})

// 类链式调用，实际上是promise的成功调用，此处没有意义
promise.then(val => {
    console.log(val, "success")
}, err => {
    console.log(err, "fail")
})

promise.then(val => {
    console.log(val, "success")
}, err => {
    console.log(err, "fail")
})

promise.then(val => {
    console.log(val, "success")
}, err => {
    console.log(err, "fail")
})