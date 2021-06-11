// 将needResetMethods里面的函数，调用时，触发
const arrayPrototype = Array.prototype;

// 需要被重写的几个方法，保证操作数组时能对外通知（notify）
const needResetMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

export default class VueArray extends Array {
    constructor() {
        super();
    }
}

needResetMethods.forEach((name) => {
    const original = arrayPrototype[name];

    // 只有function函数才有arguments
    VueArray[name] = function() {
        // 调取原方法结果
        const result = original.apply(this, arguments);

        const args = [...arguments];

        const ob = this.__ob__;

        // 有三种方法push\unshift\splice能够插入新项，现在要把插入的新项也要变为observe的
        let inserted = [];
        switch (name) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }

        // 插入的新值也要变为响应式
        if (inserted.length > 0) {
            ob.observeArray(inserted);
        }
        ob.dep.notify();

        return result;
    }
});