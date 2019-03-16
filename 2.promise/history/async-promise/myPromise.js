function Promise(executor) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;

    // 定义两个队列 存放对应的回调 
    this.onRedolvedCallbacks = []; //存放成功函数的回调
    this.onRejectedCallbacks = []; //存放失败函数的回调

    const self = this;

    function resolve(value) {
        if (self.status === "pending") {
            self.status = "fulfilled";
            self.value = value;
            self.onRedolvedCallbacks.forEach(fn => fn());
        }
    }

    function reject(reason) {
        if (self.status === "pending") {
            self.status = "rejected";
            self.reason = reason;
            self.onRejectedCallbacks.forEach(fn => fn())
        }
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error)
    }

}

Promise.prototype.then = function (fulfilled, rejected) {
    const self = this;
    switch (self.status) {
        case "fulfilled":
            fulfilled(self.value);
            break;
        case "rejected":
            rejected(self.reason);
            break;
        case "pending":
            // 如果是异步的时候 ，需要把成功和失败 分别存放到数组里,发布订阅, 
            // 如果稍后调用了resolve  会让函数依次执行，执行的时候 会将成功或者失败的值进行传递
            self.onRedolvedCallbacks.push(function () {
                fulfilled(self.value)
            });
            self.onRejectedCallbacks.push(function () {
                rejected(self.reason)
            });
            break;
        default:
            break;
    }
}

module.exports = Promise;