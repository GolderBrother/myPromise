// Promise 是一个类 承诺 允诺  (异步解决方案)
// pending 等待状态 ->  fulfilled 成功态 (玩具少)
// pending 等待状态 ->  rejected 失败态 (玩具多)
// 成功态(fulfilled)和失败态(rejected)不能相互转化 
// exexcutor函数 而且会立即执行，参数是resolve函数 reject
// 每个promise实例都有一个then方法
const myPromise = require("./myPromise");
let promise = new myPromise((resolve, reject) => { // exexcutor执行器函数
    // 这边先成功再报错,最后Promise的状态还是成功，因为Promise的状态一旦决议了就不会再改变
    resolve("成功了");
    // reject("失败了");
    throw new Error("Error");
})

promise.then(val => {
    console.log(val, 'success')
}, err => {
    console.log(err, 'error')
})