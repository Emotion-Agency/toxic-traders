import { resize } from '@emotionagency/utils'
import gsap from 'gsap'
import moment from 'moment-timezone'

interface IProps {
  chart: Ref<any>
  timeframe: number
  $chartContainer: Ref<HTMLElement | null>
  $priceRangeTool: Ref<SVGElement | null>
}

export const usePriceRangeTool = ({
  chart,
  $chartContainer,
  $priceRangeTool,
  timeframe,
}: IProps) => {
  const isDrawing = ref(false)

  const chartBounds = ref({ minX: 0, maxX: 0, minY: 0, maxY: 0 })

  const firstCoord = ref({ x: 0, xValue: 0, y: 0, yValue: 0 })
  const lastCoord = ref({ x: 0, xValue: 0, y: 0, yValue: 0 })

  const chartInstance = computed(() => chart.value?.chart)

  const candlesSelector = '.apexcharts-grid-borders'

  const setChartBounds = () => {
    if (!chartInstance.value) return

    chartBounds.value = {
      minX: chartInstance.value.w.globals.minX,
      maxX: chartInstance.value.w.globals.maxX,
      minY: chartInstance.value.w.globals.minY,
      maxY: chartInstance.value.w.globals.maxY,
    }
  }

  function setCoordinates(event: MouseEvent) {
    const $candles = $chartContainer.value?.querySelector(candlesSelector)

    const rect = $candles.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const xPercent = gsap.utils.clamp(0, 100, x / rect.width)
    const yPercent = gsap.utils.clamp(0, 100, y / rect.height)

    const xValue = gsap.utils.mapRange(
      0,
      1,
      chartBounds.value.minX,
      chartBounds.value.maxX,
      xPercent
    )

    const yValue = gsap.utils.mapRange(
      0,
      1,
      chartBounds.value.minY,
      chartBounds.value.maxY,
      1 - yPercent
    )

    return { x, y, xValue, yValue }
  }

  const recalcBounds = () => {
    const $candles = $chartContainer.value?.querySelector(candlesSelector)

    const innerRect = $candles.getBoundingClientRect()
    const containerRect = $chartContainer.value.getBoundingClientRect()

    const top = innerRect.top - containerRect.top

    $priceRangeTool.value.style.width = innerRect.width + 'px'
    $priceRangeTool.value.style.height = innerRect.height + 'px'
    $priceRangeTool.value.style.top = top + 'px'
    $priceRangeTool.value.style.left = innerRect.left + 'px'
  }

  const initPriceRangeTool = () => {
    resize.on(recalcBounds)
  }

  const priceDifference = computed(() => {
    console.log(firstCoord.value.yValue, lastCoord.value.yValue)
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
    isDrawing.value = true

    lastCoord.value = { x: 0, y: 0, xValue: 0, yValue: 0 }

    firstCoord.value = setCoordinates(event)
  }

  function handleMouseMove(event: MouseEvent) {
    if (!isDrawing.value) return

    lastCoord.value = setCoordinates(event)
  }

  const resetDrawing = () => {
    firstCoord.value = { x: 0, xValue: 0, y: 0, yValue: 0 }
    lastCoord.value = { x: 0, xValue: 0, y: 0, yValue: 0 }
  }

  const keyboardHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      resetDrawing()
    }
  }

  function handleMouseUp() {
    isDrawing.value = false
  }

  onMounted(() => {
    document.addEventListener('keydown', keyboardHandler)
  })

  onBeforeUnmount(() => {
    resize.off(recalcBounds)
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
    initPriceRangeTool,
    recalcBounds,
    setChartBounds,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetDrawing,
  }
}
