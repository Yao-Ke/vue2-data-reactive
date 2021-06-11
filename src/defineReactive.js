import Dep from "./Dep";
import observe from "./observe";


// 对外放出的一个劫持数据的方法
export default function defineReactive(data, key, value) {
    // value 利用闭包的特性，实现旧数据的保存
    if (arguments.length < 3) {
        value = data[key];
    }
    let dep = new Dep();

    let childObj = observe(value);

    // 对数据的劫持
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend();

            return value;
        },

        set(newVal) {
            if (newVal === value) {
                console.warn('新旧属性相同，不触发');
                return false;
            }
            console.log(`set ${key} = ${newVal}`);
            value = newVal;

            // 每次传入新值，都要重新初始化一遍
            childObj = observe(value);
            
            dep.notify();
        }
    })
}