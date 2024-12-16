import gsap from 'gsap'
import moment from 'moment-timezone'
import { candlesSelector } from '~/components/chart/constants'

interface IProps {
  chart: Ref<any>
  timeframe: number
  enabled: Ref<boolean>
  $chartContainer: Ref<HTMLElement | null>
}

export const usePriceRangeTool = ({
  chart,
  $chartContainer,
  timeframe,
  enabled,
}: IProps) => {
  const isDrawing = ref(false)

  const chartBounds = ref({ minX: 0, maxX: 0, minY: 0, maxY: 0 })

  const mouseStart = ref({ x: 0, y: 0 })
  const mouseEnd = ref({ x: 0, y: 0 })

  const mousePercentStart = ref({ x: 0, y: 0 })
  const mousePercentEnd = ref({ x: 0, y: 0 })

  const firstCoord = computed(() => {
    const xValue = gsap.utils.mapRange(
      0,
      1,
      chartBounds.value.minX,
      chartBounds.value.maxX,
      mousePercentStart.value.x
    )

    const yValue = gsap.utils.mapRange(
      0,
      1,
      chartBounds.value.minY,
      chartBounds.value.maxY,
      1 - mousePercentStart.value.y
    )

    return { x: mouseStart.value.x, y: mouseStart.value.y, xValue, yValue }
  })

  const lastCoord = computed(() => {
    const xValue = gsap.utils.mapRange(
      0,
      1,
      chartBounds.value.minX,
      chartBounds.value.maxX,
      mousePercentEnd.value.x
    )

    const yValue = gsap.utils.mapRange(
      0,
      1,
      chartBounds.value.minY,
      chartBounds.value.maxY,
      1 - mousePercentEnd.value.y
    )

    return { x: mouseEnd.value.x, y: mouseEnd.value.y, xValue, yValue }
  })

  const setChartBounds = () => {
    const chartInstance = chart.value?.chart
    if (!chartInstance) return

    chartBounds.value = {
      minX: chartInstance.w.globals.minX,
      maxX: chartInstance.w.globals.maxX,
      minY: chartInstance.w.globals.minY,
      maxY: chartInstance.w.globals.maxY,
    }
  }

  function setCoordinates(event: MouseEvent) {
    const $candles = $chartContainer.value?.querySelector(candlesSelector)

    const rect = $candles.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const xPercent = gsap.utils.clamp(0, 100, x / rect.width)
    const yPercent = gsap.utils.clamp(0, 100, y / rect.height)

    return { x, y, xPercent, yPercent }
  }

  const priceDifference = computed(() => {
    if (!firstCoord.value.yValue || !lastCoord.value.yValue) return 0

    return lastCoord.value.yValue - firstCoord.value.yValue
  })

  const bars = computed(() => {
    if (!firstCoord.value.xValue || !lastCoord.value.xValue) return 0

    return Math.round(
      Math.abs(lastCoord.value.xValue - firstCoord.value.xValue) /
        60000 /
        timeframe
    )
  })

  const percentageChange = computed(() => {
    if (!firstCoord.value.yValue || !lastCoord.value.yValue) return 0

    return (priceDifference.value / firstCoord.value.yValue) * 100
  })

  const startDate = computed(() => {
    if (!lastCoord.value.xValue) return ''

    return moment(firstCoord.value.xValue).format('HH:mm')
  })

  const endDate = computed(() => {
    if (!lastCoord.value.xValue) return ''

    return moment(lastCoord.value.xValue).format('HH:mm')
  })

  function handleMouseDown(event: MouseEvent) {
    if (!enabled.value) return
    isDrawing.value = true

    mouseEnd.value = { x: 0, y: 0 }
    mousePercentEnd.value = { x: 0, y: 0 }

    const { x, y, xPercent, yPercent } = setCoordinates(event)

    mouseStart.value = { x, y }
    mousePercentStart.value = { x: xPercent, y: yPercent }
  }

  function handleMouseMove(event: MouseEvent) {
    if (!enabled.value) return

    if (!isDrawing.value) return

    const { x, y, xPercent, yPercent } = setCoordinates(event)

    mouseEnd.value = { x, y }
    mousePercentEnd.value = { x: xPercent, y: yPercent }
  }

  function handleMouseUp() {
    if (!enabled.value) return
    isDrawing.value = false
  }

  const resetDrawing = () => {
    isDrawing.value = false
    mouseStart.value = { x: 0, y: 0 }
    mouseEnd.value = { x: 0, y: 0 }
    mousePercentStart.value = { x: 0, y: 0 }
    mousePercentEnd.value = { x: 0, y: 0 }
  }

  const keyboardHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      resetDrawing()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', keyboardHandler)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', keyboardHandler)
  })

  return {
    firstCoord,
    lastCoord,
    isDrawing,
    priceDifference,
    bars,
    percentageChange,
    startDate,
    endDate,
    setChartBounds,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetDrawing,
  }
}
