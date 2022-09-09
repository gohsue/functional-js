/**
 * go 함수를 ts화 시키기
 * 
 * [js 형식]
 *  const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
};
 * const go = (init, ...args) => reduce((a, f) => f(a), init, args);
 */

import { curry } from "./curry";

const reduce = (func: (...a: any) => any, acc: any, iter?: Iterable<any>) => {
  // 세 번째 인자가 존재하지 않으면 두 번째 인자를 이터러블로 취급
  const _iter = iter ? iter : acc[Symbol.iterator]();
  let _acc = iter ? acc : _iter.next().value;

  for (const f of _iter) {
    _acc = func(_acc, f);
  }

  return _acc;
};

export const go = (init: any, ...args: any) =>
  reduce((result, func) => func(result), init, args);

const go1 = (n: number) => n + 10;
console.log(go(1, go1)); // 11

const go2 = (n: number) => n + 100;
console.log(go(1, go1, go2)); // 111

console.clear();

/**
 * curry 적용하면?
 */

const currreduce = curry(reduce);
const currgo = curry((init: any, ...args: any) =>
  currreduce((result: any, func: (a: any) => any) => func(result), init, args)
);

const add = (addNumber: number) => (n: number) => n + addNumber;
const add20 = add(20);
const add300 = add(300);
const sum = (func: (n: number) => number, n: number) => func(add20(n)); // 고차 함수

// curry 적용 안 한 go 방식
const number1 = 1;
const goWithNoCurry = go(
  number1,
  (n: number) => add20(n), // 21 (축약형: add20으로도 표현 가능)
  (n: number) => add300(n), // 321 (위와 동일)
  (n: number) => sum((result) => result + 4000, n) // 4341
);
console.log(goWithNoCurry); // 321

// curry 적용한 go 방식
const currySum = curry(sum);
const goWithCurry = currgo(
  1,
  add20,
  add300,
  currySum((result: number) => result + 4000) // 4341
);
console.log(goWithCurry);
console.clear();

// 인자가 두개라면? -> 인자를 두 개 받아야하기 때문에 축약형을 사용할 수 없다.
const currySum2 = curry((func: (n: number) => number, n1: number, n2: number) =>
  func(add(n1)(n2))
);
const goWithCurry2 = currgo(1, add20, add300, (n: number) =>
  currySum2((result: number) => result + 4000)(20, n)
);
console.log(goWithCurry2);

// curry를 걸어주면 인자가 두 개인 값도 축약형으로 사용할 수 있다.
const currySum3 = curry((n1: number, n2: number) =>
  currySum2((result: number) => result + 4000)(n1, n2)
);
const goWithCurry3 = currgo(1, add20, add300, currySum3(20));
console.log(goWithCurry3);
