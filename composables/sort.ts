export interface ISortState {
  sortBy?: string
  sortOrder?: 1 | 2
}

type TFunc = (...args: any) => any

export const useSort = (defaultSortState?: ISortState, onSortCb?: TFunc) => {
  const sortState = ref<ISortState>({
    sortBy: defaultSortState?.sortBy || '',
    sortOrder: defaultSortState?.sortOrder || 1,
  })

  const onSort = (item: string) => {
    const isSameSortBy = sortState.value.sortBy === item

    const sortOrder = isSameSortBy
      ? sortState.value.sortOrder === 1
        ? 2
        : 1
      : 1

    sortState.value = {
      sortBy: item,
      sortOrder,
    }

    if (typeof onSortCb !== 'function') return
    onSortCb()
  }

  return { sortState, onSort }
}
