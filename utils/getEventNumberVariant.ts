export const isNegative = (number: number | string) => {
  return Number(number) < 0
}

export const getEventNumberVariant = (
  number: number | string,
  dir: 0 | 1 = 0
) => {
  if (isNaN(Number(number))) {
    return 'neutral'
  }

  if (Number(number) === 0) {
    return 'neutral'
  }

  if (isNegative(number) && dir === 0) {
    return 'negative'
  }

  if (!isNegative(number) && dir === 1) {
    return 'negative'
  }

  return 'positive'
}
