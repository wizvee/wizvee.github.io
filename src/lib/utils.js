export function _reduce(fn, iter, acc) {
  if (!acc) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = fn(acc, a);
  }
  return acc;
}

export function _pipe() {
  const fns = arguments;
  return (arg) => _reduce((arg, fn) => fn(arg), fns, arg);
}

export function _go(...args) {
  return _reduce((a, fn) => fn(a), args);
}
