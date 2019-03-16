// lodash debounce debounce
// 满足一个特点就是高阶函数 redux，执行一定的次数后在执行回调函数
function after(times, callback) {
    return () => {
        if (--times === 0) {
            callback && callback()
        }
    }
}

// 高阶函数
let newFn = after(3, () => {
    console.log("after")
})

newFn();
newFn();
newFn();
newFn();

//after