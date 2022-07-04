'use strict';

// 함수형 프로그래밍을 위한 첫 돋움.. 가보자고!


/*
const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
}

const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
}

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}
*/
const map = (func, iter) => iter.map(i => func(i));
// ex) map(item => item.name, [{name: 'Kwan', gender: 'man'}, {name: 'Celyne', gender: 'woman'}]);

const filter = (f, iter) => iter.filter(i => f(i));
// ex) filter(item => item.name === 'Celyne', [{name: 'Kwan', gender: 'man'}, {name: 'Celyne', gender: 'woman'}]);

const reduce = (f, acc, iter) => iter.reduce(f, acc);
// ex) reduce((a,b) => a+b, 2, [20,200]);

const go = (init, ...args) => reduce((a, f) => f(a), init,  args);
// ex) go (0, a => a+1, a => a+10, a => a+100, log);

const pipe = (f, ...args) => (init) => go(f(init), ...args);
// ex) const f = pipe (a => a+1, a => a+10, a => a+100);
// console.log(f(0));


