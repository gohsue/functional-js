/**
 * pipe 함수를 ts화 시키기
 *
 * [js 형식]
 * const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
 * 함수를 반환하는 함수. 첫 번째 인자의 함수 안에서 인자가 여러 개인 경우의 처리(...as) 포함
 */

import { go } from "./go";

export const pipe = (f: (...as: any) => any, ...fs: any) => (...as: any) => go(f(...as), ...fs);

const pipe1 = pipe(
  (n1: number, n2: number) => n1 + n2,
  (n: number) => n + 10,
  (n: number) => n + 100
);
//console.log(pipe1(0, 1));
