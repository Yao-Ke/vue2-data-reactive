import Observe from "./Observe";
import Watcher from "./Watcher";

let vueData = {
    number: 9999,
    list: [],
    tree: {
        user: 111,
        mo: '123123132',
        lv: {
            a: false
        },
        treeList: []
    }
};


Observe(vueData);
new Watcher(vueData, 'tree.user', (value) => {
    console.log(`watcher callback触发${value}`);
})
vueData.tree.user = 'anAi';

console.log(vueData);

// console.log(vueData.number);

// vueData.number = 1;

// vueData.list.push(123)

// console.log(vueData);
