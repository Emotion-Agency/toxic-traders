export const useScrollPos = () => {
  const { x, y } = useWindowScroll()

  interface IRouteScrollPos {
    [key: string]: { x: number; y: number }
  }

  const routeScrollPos = useState<IRouteScrollPos[]>('routeScrollPos', () => [])

  const route = useRoute()

  const saveScrollPos = () => {
    const key = route.fullPath
    const pos = routeScrollPos.value.find(item => item[key])
    if (!pos) {
      routeScrollPos.value.push({ [key]: { x: x.value, y: y.value } })
    } else {
      pos[key] = { x: x.value, y: y.value }
    }
  }

  return { routeScrollPos, saveScrollPos }
}
