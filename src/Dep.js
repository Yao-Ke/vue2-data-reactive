// uid避免重复
let uid = 0;

export default class Dep {

    constructor() {
        // 保存相关的watcher
        this.subs = [];
        
        this.id = uid++;
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    // 收集依赖
    depend() {
        if (Dep.target) {
            // 这个this就是此次新建的watcher
            Dep.target.addDep(this);
        }
    }

    // 通知更新
    notify() {
        // 将关联的watcher观察者通知，执行回调
        const subs = [...this.subs];
        subs.forEach((item) => {
            item.update();
        });
    }
}
Dep.target = null;