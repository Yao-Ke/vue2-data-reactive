import Dep from "./Dep";

// uid避免重复
let uid = 0;

export default class Watcher {
    constructor(target, expression, callback) {
        console.log('Watcher 构造开始');
        this.id = uid++;

        this.target = target;
        this.callback = callback;

        this.getter = parsePath(expression);

        this.value = this.get();
    }  

    // 添加进依赖收集
    addDep(dep) {
        dep.addSub(this);
        
    }

    get() {
        // 在构造时Dep.target有值，这时候收集Dep.target的依赖（watcher）
        Dep.target = this;
        const obj = this.target;

        let value;

        try {
            value = this.getter(obj);
        } finally {

            // 收集完毕，清空
            Dep.target = null;
        }

        return value;
    }

    update() {
        // 通知到，运行回调
        this.run();
    }

    run() {
        this.getAndInvoke(this.callback);
    }

    // 检测新旧值并触发callback函数
    getAndInvoke(cb) {
        // 拿到目标值，并用闭包，保存旧值
        const value = this.getter(this.target);
        
        // 新旧对比
        if (value !== this.value || typeof value === 'object') {
            const oldVal = this.value;
            this.value = value;
            console.log(cb);

            // 执行回调
            cb.call(this.target, value, oldVal);
        }
    }
}

// 深度取出链式值
const parsePath = (chainKey) => {
    let segments = chainKey.split('.');

    return (obj) => {
        segments.forEach(item => {
            let data = obj[item];
            if (data) {
                obj = obj[item];
            }
        });

        return obj;
    }
}