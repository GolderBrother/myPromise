function Promise(executor) {
    // promise 的初始化状态,也是等待状态
    this.state = "pending";
    // 成功值和失败的原因
    this.value = undefined;
    this.reason = undefined;
    const self = this;
    // 定义成功的函数
    function resolve(value) {
        // 只能通过 pending 等待状态 -> fulfilled(resolved) 成功状态
        if (self.state === "pending") {
            self.value = value;
            self.state = "fulfilled"
        }
    }

    function reject(reason) {
        // 只能通过 pending 等待状态 -> rejected 失败状态
        if (self.state === "pending") {
            self.reason = reason;
            self.state = "rejected";
        }
    }

    // 如果要让Promise变为失败态
    // 两种方式
    // (1)调用reject方法
    // (2)抛出错误异常
    try {
        // Promise的参数执行器是主线程的同步任务，会立即执行
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }


}

Promise.prototype.then = function (onfulfilled, onrejected) {
    const self = this;
    if (self.state === "fulfilled") { // 如果状态是成功 则调用成功的回调
        onfulfilled(self.value)
    }
    if (self.state === "rejected") { // 如果状态是失败 则调用失败的回调
        onrejected(self.reason);
    }
}

module.exports = Promise;