// generator 生成器 
// async + await
// dva + react redux-saga
// generator 可以配合着promise使用 不配和也可以

// 生成器是用来生成迭代器的
let likeArray = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]: function* () {
        let index = 0;
        while (index !== this.length) {
            yield this[index++]
        }
    }
}

// 迭代器就是一个有next方法的对象 每次调用next都会返回一个对象 对象里有done，value, for of 必须拥有迭代器的元素才能使用
// 默认我用...likeArray 会让迭代器执行
let arr = [...likeArray];
console.log(arr);
// [ 1, 2, 3 ]

// generator的好处就是 遇到 yield就会暂停，调用next就会继续向下执行
function* gen() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

let it = gen();
let flag = false;
do {
    let {
        value,
        done
    } = it.next();
    console.log(value, done);
    flag = done;
} while (!flag);

// [ 1, 2, 3 ]
// 1 false
// 2 false
// 3 false
// 4 false
// undefined true