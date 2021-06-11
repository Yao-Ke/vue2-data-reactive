import Observer from "./Observer";

export default (value) => {
    if (typeof value !== 'object') {
        return new Error('必须传入object');
    }

    // 如果已经有了，代表已经创建observer，直接返回
    let ob = null;
    if (typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__;
    } else {
        // 没有则新建Observer，实现监听
        ob = new Observer(value);
    }
    return ob;
}