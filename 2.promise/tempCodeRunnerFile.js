// promise怎么变成失败态 reject new Error
// // 恶魔金字塔 回调嵌套
// const fs = require("fs");
// const myPromise = require("./myPromise");

// function read(url) {
//     return new myPromise((resolve, reject) => {
//         fs.readFile(url, "utf8", function (err, data) {
//             if (err) reject(err)
//             resolve(data)
//         })
//     })
// }
// console.log("script start")

// // 链式调用 不是jquery的方式 返回this
// // 1）如果then方法中返回的是一个promise 那就采用这个promise的状态用来决议当前Promise的成功或者失败，把promise的结果作为参数
// // 2）如果返回的是一个普通值 直接作为下一个then的成功的参数
// // 3) 在then方法中抛出异常 也会走失败， 如果错误中返回一个普通值 也会变成成功态
// // * 每一个then方法都返回一个新的promise
// read("./assets/name.txt").then(val => {
//     console.log(val, "success");
//     //  如果返回的是一个promise  会让这个promise执行，并且采用他的状态作为下一个then成值
//     return read(val)
// }, err => {
//     console.log(err, "failed");
//     throw new Error("Error");
// }).then(val => {
//     console.log(val, "success2");
// }, err => {
//     console.log(err, "failed2");
//     // 没有返回相当于  return undefined,为普通值，因此也会变成成功态
// }).then(val => {
//     console.log(val, "success3");
// }, reason => {
//     console.log(reason, "failed3");
// })

// console.log("script end")