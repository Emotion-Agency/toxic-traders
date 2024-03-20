export interface iLogs {
  id?: number | null
  level?: string | null
  message?: string | null
  timestamp?: string | null
}

export interface iLogsData {
  data: {
    logs: iLogs[]
    totalCount: number
    message: string
  }
}
