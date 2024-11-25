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

  watch(
    () => events.value,
    () => {
      totalCountPages.value = events.value?.length
    }
  )

  const paginatedEvents = computed(() => {
    const start = (currentPage.value - 1) * itemsCount.value
    const end = start + itemsCount.value

    return sortedEvents.value.slice(start, end)
  })

  watch([currentPage, itemsCount], async () => {
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
    paginatedEvents,
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
