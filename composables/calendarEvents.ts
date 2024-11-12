import { getFourWeeksCalendarEvents } from '~/utils/api/calendar/calendarEvents'

export const useCalendarEvents = () => {
  const events = ref([])

  const { toast } = useToasts()

  const getEvents = async () => {
    try {
      const res = await getFourWeeksCalendarEvents()
      events.value = res?.data
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('An error occurred while fetching events. Please try again.')
    }
  }

  return { events, getEvents }
}
