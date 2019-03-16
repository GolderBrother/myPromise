// 发布订阅模式

// 必须先订阅(on) 才能发布(emit)
// 订阅(on): push arr
// 发布(emit): arr.forEach(fn => fn())

const fs = require("fs");

// 声明一个事件监听函数
function EventListener() {
    // 订阅和发布没有关系， 通过中间媒介来管理，也就是这边的_arr
    this._arr = []
}

// 订阅方法
EventListener.prototype.on = function (fn) {
    // 订阅就是把对应的回调放到数组里面
    this._arr.push(fn)
}

// 发布方法
EventListener.prototype.emit = function () {
    // 发布的时候， 就拿出数组里面的函数依次执行
    this._arr.forEach(fn => {
        console.log("this", this._arr);
        fn.apply(this, arguments);
    })
}
const e = new EventListener();
let school = {};
e.on(function () {
    console.log("一个接口成功")
})
e.on(function (key, data) {
    school[key] = data;
    if (Object.keys(school).length === this._arr.length) {
        console.log("执行完毕：", school)
    }
})

fs.readFile("./assets/name.txt", "utf8", function (err, data) {
    if (err) return console.log(err)
    e.emit("name", data)
})

fs.readFile("./assets/age.txt", "utf8", function (err, data) {
    if (err) return console.log(err)
    e.emit("age", data)
})