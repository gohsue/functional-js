import { curry } from "./curry";
import { log, reduce } from "./go";
import { L, _ } from "./lazy";
import { pipe } from "./pipe";

const join = curry((sep: string, iter: Iterable<any>) => reduce((a: any, b: any) => `${a}${sep}${b}`, iter));

const queryStr = pipe(
  Object.entries,
  L.map(([k, v]: any) => `${k}=${v}`),
  join('&'),
  log
);


export { queryStr, join };
