export interface ICreateEventPayload {
  id: number
  eventId: string
  eventStatus: number
}

export interface IUpdateEventPayload {
  eventId: string
  eventStatus: number
}

export interface IEvent {
  id: number
  eventId: string
  eventStatus: number
}
