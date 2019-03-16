function* gen() {
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(3);
}

let it = gen();
// 第一次调用next函数时传递的参数 是无效的
it.next();
// 第二次next执行时传递的参数会返回给第一次yield的返回值,跟yield后面的值无关
it.next("hello");
// hello
it.next('aaa');
// aaa

let fs = require("fs");
//Bluebird 是早期 Promise 的一种实现，它提供了丰富的方法和语法糖，
//一方面降低了 Promise 的使用难度，一方面扩展了 Promise 的功能。
let bulebird = require("bluebird");
// 将fs.readFile方法变为Promise态
let read = bulebird.promisify(fs.readFile);

function* r() {
    let age = yield read("./assets/name.txt", "utf8");
    let address = yield read(age, "utf8");
    let r = yield read(address, "utf8");
    return r;
}

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {
                value,
                done
            } = it.next(data);
            if (!done) { // 如果还能继续迭代
                // 调用这个promise，将执行的结果传递下去
                value.then(data => {
                    next(data); //递归调用
                }, reason => reject(reason))
            } else {
                resolve(value)
            }
        }
        next();
    })

}

co(r()).then(data => {
    console.log(data);
    // hello
    // aaa
    // 回龙观
})