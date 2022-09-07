"use strict";

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
//const map = (func, iter) => iter.map(i => func(i));
// ex) map(item => item.name, [{name: 'Kwan', gender: 'man'}, {name: 'Celyne', gender: 'woman'}]);

//const filter = (f, iter) => iter.filter(i => f(i));
// ex) filter(item => item.name === 'Celyne', [{name: 'Kwan', gender: 'man'}, {name: 'Celyne', gender: 'woman'}]);

//const reduce = (f, acc, iter) => iter.reduce(f, acc);
// ex) reduce((a,b) => a+b, 2, [20,200]);

//const go = (init, ...args) => reduce((a, f) => f(a), init,  args);
// ex) go (0, a => a+1, a => a+10, a => a+100, log);

//const pipe = (f, ...args) => (...init) => go(f(...init), ...args);
// ex) const f = pipe (a => a+1, a => a+10, a => a+100);
// console.log(f(0));

// curry: 함수를 받아서 함수를 리턴하고, 인자를 받아서 인자가 원하는 개수만큼의 인자가 들어왔을 때 나중에 평가시키는 함수
// 인자를 받아오는데, 하나를 뺀 나머지 인자(..._)가 존재하면 즉시 실행하고, 존재하지 않을 때는 나머지를 인자로 받는 함수를 리턴한다.
const curr =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
// ex) const mult = curry((a, b) => a * b);
// mult(3) ---> (..._) => f(3, ..._) 리턴 값 자체가 함수가 된다.
// mult(3)(2) ---> (2) => f(3,2) 가 되므로 즉시 실행 -> 6이 된다.

const map = curr((f, iter) => iter.map((i) => f(i)));
const filter = curr((f, iter) => iter.filter((i) => f(i)));
const reduce = curr((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
const go = curr((init, ...args) => reduce((a, f) => f(a), init, args));
const pipe = curr(
  (f, ...args) =>
    (...init) =>
      go(f(...init), ...args)
);

// 아래는 예시

const products = [
  {
    name: "🍎",
    price: 10000,
  },
  {
    name: "🍇",
    price: 15000,
  },
  {
    name: "🥝",
    price: 35000,
  },
  {
    name: "🍓",
    price: 20000,
  },
  {
    name: "🍍",
    price: 28000,
  },
];

/* 기존의 표현이 curr로 말아낸 함수들을 만나 간소화된다.
go(
  products,
  (products) => filter((p) => p.price < 2000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce((a, b) => a + b, prices),
  console.log
);
*/

go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce((a, b) => a + b, prices),
  console.log
);

go(
  products,
  (products) => filter((p) => p.price < 20000)(products),
  (products) => map((p) => p.price)(products),
  (prices) => reduce((a, b) => a + b)(prices),
  console.log
);

go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce((a, b) => a + b),
  console.log
);

// a => f(a) ---> 즉, f(a)로 표현이 가능하다.
// 이렇게 curr을 이용하면 코드를 줄일 수 있다.
