import type { ITableCalendarEvent } from '~/types/calendar/events'

export const useCalendarTable = (events: Ref<ITableCalendarEvent[]>) => {
  const router = useRouter()
  const route = useRoute()

  const { onSort, sortState } = useSort({
    sortBy: (route.query.sortedBy as string) ?? 'Time',
    sortOrder: (Number(route.query.sortedOrder as string) as 1 | 2) || 1,
  })

  const sortedEvents = computed(() => {
    return events.value.sort((a, b) => {
      if (sortState.value.sortBy === 'Time') {
        if (sortState.value.sortOrder === 1) {
          return new Date(b.time).getTime() - new Date(a.time).getTime()
        } else {
          return new Date(a.time).getTime() - new Date(b.time).getTime()
        }
      }
    })
  })

  const {
    currentPage,
    itemsCount,
    searchValue,
    totalCountPages,
    nextPageClick,
    prevPageClick,
    onInputBlur,
    onInputChange,
    onChangeCount,
  } = usePagination(
    route.query.page ? Number(route.query.page) : 1,
    route.query.count ? Number(route.query.count) : 100
  )

  watch([currentPage, itemsCount], () => {
    router.push({
      query: {
        ...route.query,

        page: currentPage.value,
        count: itemsCount.value,
      },
    })
  })

  watch(sortState, () => {
    router.push({
      query: {
        ...route.query,
        sortedBy: sortState.value.sortBy,
        sortedOrder: sortState.value.sortOrder,
      },
    })
  })

  return {
    onSort,
    sortState,
    currentPage,
    itemsCount,
    searchValue,
    totalCountPages,
    nextPageClick,
    prevPageClick,
    onInputBlur,
    onInputChange,
    onChangeCount,
  }
}
