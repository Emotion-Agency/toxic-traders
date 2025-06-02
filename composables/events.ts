import type {
  ICreateEventPayload,
  IEvent,
  IUpdateEventPayload,
} from '~/types/events/events'
import {
  createEventRequest,
  deleteEventRequest,
  getEventsRequest,
  updateEventRequest,
} from '~/utils/api/events/eventsRequests'

export const useEvents = () => {
  const { toast } = useToasts()

  const getAllEvents = async (): Promise<IEvent[]> => {
    try {
      const res = await getEventsRequest()

      return res.data
    } catch (error) {
      console.error('Error fetching all events:', error)
      toast.error(
        'An error occurred while fetching all events. Please try again.'
      )
      throw error
    }
  }

  const createEvent = async (payload: ICreateEventPayload) => {
    try {
      const res = await createEventRequest(payload)

      return res
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error(
        'An error occurred while creating the event. Please try again.'
      )
      throw error
    } finally {
      toast.success('Event created successfully.')
    }
  }

  const updateEvent = async (payload: IUpdateEventPayload, id: number) => {
    try {
      const res = await updateEventRequest(payload, id)

      return res
    } catch (error) {
      console.error('Error updating event:', error)
      toast.error(
        'An error occurred while updating the event. Please try again.'
      )
      throw error
    } finally {
      toast.success('Event updated successfully.')
    }
  }

  const deleteEvent = async (id: number) => {
    try {
      const res = await deleteEventRequest(id)

      return res
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error(
        'An error occurred while deleting the event. Please try again.'
      )
      throw error
    } finally {
      toast.success('Event deleted successfully.')
    }
  }

  return {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  }
}
