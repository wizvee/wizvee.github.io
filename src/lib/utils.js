import _ from 'lodash';

export function _map(iter, f) {
  if (!f) {
    return _.curryRight(_.map)(iter);
  }
  return _.map(iter, f);
}

export function _filter(iter, f) {
  if (!f) {
    return _.curryRight(_.filter)(iter);
  }
  return _.filter(iter, f);
}

export function _reduce(f, iter, acc) {
  if (!acc) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

export function _go(...args) {
  return _reduce((a, f) => f(a), args);
}

export function _flatten(arr) {
  if (!arr) {
    return _.curry(_.flatten);
  }
  return _.flatten(arr);
}

export function _getTotalCount(arr) {
  if (!arr) {
    return _.curry(_getTotalCount);
  }
  return _.toPairs(_.countBy(arr)).sort((a, b) => b[1] - a[1]);
}
