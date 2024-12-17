import Cursor from '~/components/icons/Cursor.vue'
import Move from '~/components/icons/Move.vue'

export const useChartTools = () => {
  const tools = ref([
    { icon: markRaw(Cursor), title: 'Draw', active: true, triggerBtn: 'D' },
    { icon: markRaw(Move), title: 'Move', active: false, triggerBtn: 'M' },
  ])

  const toolsHandler = (tool: string) => {
    tools.value = tools.value.map(item => ({
      ...item,
      active: item.title === tool,
    }))
  }

  const toolsKeyHandler = (event: KeyboardEvent) => {
    const key = event.key

    const toolsWithThisKey = tools.value.find(
      tool => tool.triggerBtn.toLowerCase() === key
    )

    if (toolsWithThisKey) {
      toolsHandler(toolsWithThisKey.title)
    }
  }

  return {
    tools,
    toolsHandler,
    toolsKeyHandler,
  }
}
