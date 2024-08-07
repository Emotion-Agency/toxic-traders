export const removeUnderlinesInArray = (arr: string[]) => {
  const arrWithoutUnderlines = arr.map(word =>
    word.replace(/^_/, '').replace(/_/g, ' ')
  )

  return arrWithoutUnderlines
}

export const removeUnderlines = (item: string) =>
  item.replace(/^_/, '').replace(/_/g, ' ')
