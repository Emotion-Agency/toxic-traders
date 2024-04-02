export interface iLogItem {
  id?: number | null
  level?: string | null
  message?: string | null
  timestamp?: string | null
}

export interface iLogsData {
  data: {
    logs: iLogItem[]
    totalCount: number
  }
}
