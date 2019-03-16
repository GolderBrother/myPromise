// const promise = new Promise((resolve, reject) => {
//     resolve("success")
// })
// const promise2 = promise.then(res => {
//     console.log(res);
//     // to refer same object 会导致无法继续执行 因为这个promise 不会成功也不会失败
//     // 返回的是一个promise 那就采用这个promise的状态用来决议当前Promise的成功或者失败，把promise的结果作为参数
//     // 但是这样相当于递归调用自己，一直在原地等待自己完成，好比想要吃饭却坐着什么都不做，这是不可能的
//     return promise2;
// })
// promise2.then(null, err => {
//     // TypeError: Chaining cycle detected for promise #<Promise>
//     console.log(err, "failed")
// })
const Promise = require("./myPromise");
let p = new Promise((resolve, reject) => {
    resolve("成功")
})

let p2 = p.then(data => {
    return new Promise((resolve, reject) => {
        console.log(data);
        reject("故意失败的")
    })
})

p2.then(val => {
    console.log(val, "success");
}, err => {
    console.log(err, "failed");
    // 没有返回就是 resolve(undefined)
}).then(data => {
    console.log(data, "success2");
}, err => {
    console.log(err, "failed2");
})