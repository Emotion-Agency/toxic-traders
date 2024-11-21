import type { Theme } from '~/types'

export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const theme = useState<Theme>('theme', () => 'system')

  return { isInEditor, isLoaded, isWaiting, theme }
}
