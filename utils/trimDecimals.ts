export const trimDecimals = (num: number, digits: number): number =>
  Math.trunc(num * 10 ** digits) / 10 ** digits
