export const createSlugByTitleAndCountry = (title: string, country: string) => {
  return `${title.toLowerCase().replace(/ /g, '-')}-${country.toLowerCase()}`
}

export const convertSlugToTitleAndCountry = (slug: string) => {
  const parts = slug.split('-')
  const country = parts.pop()
  const title = parts.join(' ')

  return {
    title,
    country,
  }
}
