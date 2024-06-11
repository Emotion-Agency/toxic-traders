export const numberToString = (num: number, sliceCount?: number): string => {
  const str = num.toString()

  return sliceCount
    ? `${str.slice(0, sliceCount)} ${str.slice(sliceCount)}`
    : str
}
