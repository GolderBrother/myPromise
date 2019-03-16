// 装饰器  前端埋点 在ajax 的请求中包装一层自己的逻辑
// 判断this是谁 就看调用时. 前面是谁this就是谁,前面没有对象调用的话，浏览器下面指向windows,node环境下执行global
// aop 面向切片编程
Function.prototype.before = function (callback) {
    const self = this;
    return function () {
        callback && callback();
        // 这边的this指向调用newFn的对象，没有对象调用，浏览器下面指向windows,node环境下执行global
        // console.log(this);
        self.apply(self, arguments);
    }
}

function fn(val) {
    console.log(`这是些一定的功能${val}`)
}

let newFn = fn.before(function () {
    console.log("我在函数前执行")
})

newFn("james");