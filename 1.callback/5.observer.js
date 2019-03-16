    // 观察者模式  基于发布订阅模式 
    // 发布订阅 发布和订阅 两者无关
    // 观察者模式 观察者 和 被观察者
    // 被观察者 应该存放着观察者 我家有个小宝宝 有一个状态
    // 被观察者状态变化 要更新自己身上的所有的观察者

    // 被观察者 需要一个 挂载 观察者的方法，  
    // 观察者需要 一个接受通知的方法。

    class Subject {
        constructor() {
            this.state = "开心";
            // 用来放观察者对象的数组
            this.arr = [];
        }
        attach(observer) {
            this.arr.push(observer)
        }
        setState(newState) {
            this.state = newState;
            this.arr.forEach(_observer => _observer.update(newState))
        }
    }

    // 应该每个数据变化 都应该对应自己的观察者变化, 而不是一个数据变了,所有的都要更新一下
    class Observer {
        constructor(name) {
            this.name = name
        }
        // 这个方法是用来被 被观察者调用的，原型上面的方法
        update(state) {
            console.log(state)
        }
    }

    const subject = new Subject();
    const my1 = new Observer("james");
    const my2 = new Observer("robin");
    subject.attach(my1);
    subject.attach(my2);
    subject.setState("大哭");