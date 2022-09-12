import { curry } from "./curry";
import { go, log, reduce } from "./go";
import { pipe } from "./pipe";

const range = (n: number) => {
  let i = -1;
  let res: number[] = [];

  while (++i < n) {
    res.push(i);
  }

  return res;
};

const rangeLazy = function* (n: number) {
  let i = -1;

  while (++i < n) {
    yield i;
  }
};

const take = curry((n: number, iter: Iterable<any>) => {
  let res: any[] = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === n) return res;
  }
  return res;
});

const map = curry((f: (a: any) => any, iter: any) => {
  const res: any[] = [];
  const _iter = iter[Symbol.iterator]();
  console.log(_iter);
  // for (const a of iter) {
  //     res.push(f(a));
  // }

  let cur;

  while (!(cur = _iter.next()).done) {
    res.push(f(cur.value));
  }

  return res;
});

const mapLazy = curry(function* (f: (a: any) => any, iter: Iterable<any>) {
  for (const a of iter) {
    yield f(a);
  }
});

/**
 * 테스트를 위한 코드
 * Iterator 로 표기하는 방식으로 속도를 더 높일 수 있음.
 * for ... of 문으로 모두 처리해둔 상태이기 때문에 속도 측정 후 변환할 예정
 **/
export const mapLazy2 = curry(function* (f: (a: any) => any, iter: any) {
  const _iter: Iterator<any> = iter[Symbol.iterator]();
  let cur;

  while (!(cur = _iter.next()).done) {
    yield f(cur.value);
  }
});

const filter = curry((f: (a: any) => boolean, iter: Iterable<any>) => {
  const res: any[] = [];

  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
});

const filterLazy = curry(function* (
  f: (a: any) => boolean,
  iter: Iterable<any>
) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const entriesLazy = curry(function* (obj: Iterable<any>) {
  for (const k in obj) {
    console.log(
      `entries!!!! : ${k} : ${obj[k as unknown as keyof typeof obj]}`
    );
    yield [k, obj[k as unknown as keyof typeof obj]];
    // /yield [k, obj[k as unknown as keyof typeof obj]];
  }
});

export const _ = {
  range,
  take,
  map,
  filter,
};

export const L = {
  range: rangeLazy,
  map: mapLazy,
  filter: filterLazy,
  entries: entriesLazy,
};

export default { _, L };

// Example

const list = rangeLazy(5);
const list2 = range(5);

console.time("1");
console.log(
  (mapLazy2((r: number) => {
    console.log(r);
    return r;
  }),
  [1, 2, 3, 4])
);

console.timeEnd("1");

console.time("2");
console.log(
  (mapLazy((r: number) => {
    console.log(r);
    return r;
  }),
  [1, 2, 3, 4])
);
//console.log(reduce((a: number,b: number) => a + b, list2));
//go(take(5, L.range(10000000)), mapLazy((r: number) => console.log(r)));
// go(1, mapLazy2((r: number) => {
//     console.log(r);
//     return r;
// }),);
console.timeEnd("2");

// console.log((mapLazy2((r: number) => {
//     console.log(r);
//     return r;
// }), 4));

// console.log((map((r: number) => {
//     console.log(r);
//     return r;
// }), [1, 2, 3, 4]));

//console.log(...(map((a: number) => a+10)([1, 2, 3])));
//console.log(...(_.filter((a: number) => a%2)([1, 2, 3])));

console.clear();

//log(queryString({limit: 10, offset: 10, type: 'notice', test: 'hi'}));

const t1 = (obj: any) =>
  go(
    obj,
    Object.entries,
    _.map((n: any) => `${n}`),
    log
  );

const t2 = pipe(
  Object.entries,
  _.map(([k, v]: any) => `${k} : ${v}`),
  log
);

const t3 = pipe(
  Object.entries,
  _.map(([k, v]: any) => `${k}=${v}`),
  reduce((a: any, b: any) => `${a}&${b}`),
  log
);

//t1({hi: 1, hi2: 2});
// t3({limit: 10, offset: 10, type: 'notice', test: 'hi'});
