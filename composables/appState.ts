import type { Theme } from '~/types'

export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const theme = useState<Theme>('theme', () => 'system')

  const isDark = usePreferredColorScheme()

  const isThemeDark = computed(() =>
    theme.value !== 'system' ? theme.value === 'dark' : isDark
  )

  return { isInEditor, isLoaded, isWaiting, theme, isThemeDark }
}
