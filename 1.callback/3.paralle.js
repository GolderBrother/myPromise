// paralle 并行
// 并发调用接口  两个ajax  ajax1 => name  ajax2 => age  = name+age

// 串行 两个人有关系  上一个人的输出是下一个人的输入
// 并行 两个人没关系 可以一期执行

// 前端面试中 发布订阅（promise原理） 观察者模式
const fs = require("fs");

function after(times, callback) {
    let result = {};
    return function (key, data) {
        result[key] = data;
        if (--times === 0) {
            callback && callback(result)
        }
    }
}

//这个方法 会在所有异步执行之后执行
let newFn = after(2, function (res) {
    console.log(res);
})

// 这边如果是Vscode右击执行代码，就是下面的写法；如果是终端中node方式执行，那就是相对路径的写发
fs.readFile("./assets/name.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err)
    }
    newFn('name', data)
})

fs.readFile("./assets/age.txt", "utf8", function (err, data) {
    if (err) {
        return console.log(err)
    }
    newFn('age', data)
})

// { name: 'james', age: '18' }