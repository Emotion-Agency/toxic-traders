import type { Theme } from '~/types'

export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const theme = useState<Theme>('theme', () => 'system')

  const isDark = usePreferredColorScheme()

  const themeValue = computed(() =>
    theme.value !== 'system' ? theme.value : isDark ? 'dark' : 'light'
  )

  return { isInEditor, isLoaded, isWaiting, theme, themeValue }
}
