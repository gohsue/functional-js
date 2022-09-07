/**
 * curry 함수를 ts화 시키기
 *
 * [js 형식]
 * const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
 * 뒤에 인자가 존재하면 함수 결과 실행, 존재하지 않으면 함수로 반환
 */

export const curry =
  (func: (a: any, ..._: any) => any) =>
  (a: any, ..._: any) =>
    _.length ? func(a, ..._) : (..._: any) => func(a, ..._);

// curry(함수1)(함수1의 인자) 형태
const curry1 = (a: number, b: number) => a + b;
const curry2 = curry(curry1)(1, 2);
console.log(curry2); // 3
console.clear();

const curry3 = (a: number, b: number, func: (n: number) => number) => () =>
  func(a + b); // 고차 함수
const curry4 = curry(curry3)(1, 2, (n: number) => n + 10);
console.log(curry4); // 함수 리턴
console.log(curry4()); // 결과값 리턴
