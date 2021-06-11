import defineReactive from "./defineReactive";
import VueArray from "./resetArray";
import observe from "./observe";
import Dep from "./Dep";

export default class Observer {
    constructor(value) {
        console.log('Observer 构造');
        this.dep = new Dep();
        
        Object.defineProperty(value, '__ob__', {
            value: this,
            // 可枚举
            enumerable: false,
            // 可修改
            writable: true,
            // 可删除
            configurable: true
        });

        // 处理数组，并重写数组方法 将新建数据的Prototype指向VueArray，VueArray指向Array，实现对数组方法的代理
        if (Array.isArray(value)) {
            Reflect.setPrototypeOf(value, VueArray.prototype);
        } else {
            this.walk(value);
        }
    }

    // 监听对象
    walk(value) {
        for (let key in value) {
            defineReactive(value, key);
        }
    }

    // 数据遍历监听
    observerArray(arr) {
        arr.forEach((item) => {
            observe(item)
        })
    }
}


