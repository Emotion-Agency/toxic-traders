import type { Theme } from '~/types'

export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const theme = useState<Theme>('theme', () => 'system')

  const isDark = usePreferredDark()

  const themeValue = computed(() => {
    if (theme.value === 'system') {
      return isDark.value ? 'dark' : 'light'
    }
    return theme.value
  })

  return { isInEditor, isLoaded, isWaiting, theme, themeValue }
}
