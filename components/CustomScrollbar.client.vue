<script lang="ts" setup>
import { clamp, raf, resize } from '~/utils/ea'

interface iProps {
  axis?: 'x' | 'y'
  parent?: HTMLElement
  position?: 'absolute' | 'fixed'
  body?: boolean
}

const props = withDefaults(defineProps<iProps>(), {
  axis: 'y',
  parent: null,
  position: 'absolute',
})

const $scrollbar = ref<HTMLElement | null>(null)
const $thumb = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isMoving = ref(false)
const isHidden = ref(false)

let min = 0
let max = 0
let size = 0

let scrollPos = 0

const getParent = (): HTMLElement => {
  if (props.body) {
    return document.documentElement
  }

  if (props.parent) {
    return props.parent
  }

  return $scrollbar.value.parentElement as HTMLElement
}

const setHeight = () => {
  const $parent = getParent()

  size = $parent.scrollHeight

  const ph = props.body ? window.innerHeight : $parent.offsetHeight

  let thumbHeight = ph * (ph / size)

  max = size - ph

  isHidden.value = size <= ph

  $thumb.value.style.height = `${thumbHeight}px`
}

const setWidth = () => {
  const $parent = getParent()

  size = $parent.scrollWidth
  const pw = props.body ? window.innerWidth : $parent.offsetWidth

  let thumbWidth = pw * (pw / size)

  max = size - pw

  isHidden.value = size <= pw
  $thumb.value.style.width = `${thumbWidth}px`
}

const setSize = () => {
  if (props.axis === 'y') {
    setHeight()
  } else {
    setWidth()
  }
}

const setVisibility = (value: boolean) => {
  isVisible.value = value
}

const inactivity = new Inactivity(setVisibility)

const update = e => {
  const oY = e?.clientY ?? e?.targetTouches[0]?.clientY ?? 0
  const oX = e?.clientX ?? e?.targetTouches[0]?.clientX ?? 0

  const $parent = getParent()

  const ch = $parent.clientHeight
  const cw = $parent.clientWidth

  const offsetParentY = $scrollbar.value.getBoundingClientRect().top
  const offsetParentX = $scrollbar.value.getBoundingClientRect().left

  const percentY = (100 * (oY - offsetParentY)) / ch
  const percentX = (100 * (oX - offsetParentX)) / cw

  if (props.axis === 'y') {
    $parent.scrollTop = (max * percentY) / 100
  } else {
    $parent.scrollLeft = (max * percentX) / 100
  }
}

const start = () => {
  isMoving.value = true

  document.documentElement.addEventListener('mousemove', update)
}

const end = () => {
  isMoving.value = false

  document.documentElement.removeEventListener('mousemove', update)
}

const onScroll = () => {
  setSize()

  const $parent = getParent()

  const ch = $parent.clientHeight
  const cw = $parent.clientWidth

  const position = props.axis === 'y' ? $parent.scrollTop : $parent.scrollLeft

  if (
    position === scrollPos &&
    ($parent.scrollTop === position || $parent.scrollLeft === position)
  ) {
    return
  }

  setVisibility(true)
  inactivity?.reset()

  const percentY = (100 * position) / (size - ch)
  const percentX = (100 * position) / (size - cw)

  if (props.axis === 'y') {
    $thumb.value.style.top = percentY.toFixed(2) + '%'
    $thumb.value.style.transform = `translateY(-${percentY.toFixed(2)}%)`
  } else {
    $thumb.value.style.left = percentX.toFixed(2) + '%'
    $thumb.value.style.transform = `translateX(-${percentX.toFixed(2)}%)`
  }

  scrollPos = position
}

const init = () => {
  raf.on(onScroll)
  document.documentElement.addEventListener('mouseup', end)
  document.documentElement.addEventListener('touchend', end)
}

onMounted(() => {
  nextTick(init)
})

onBeforeUnmount(() => {
  resize.off(setSize)

  raf.off(onScroll)
  inactivity?.destroy()
})
</script>

<template>
  <div
    ref="$scrollbar"
    class="scrollbar"
    :class="[
      `scrollbar--${axis}`,
      body && 'scrollbar--body',
      isHidden && 'hidden',
    ]"
    :style="{ position }"
    @mousedown="start"
    @touchstart="start"
    @click="update"
    @mouseenter="inactivity?.reset"
  >
    <div
      ref="$thumb"
      class="scrollbar__thumb"
      :class="[isVisible && 'scrolling', isMoving && 'active']"
    ></div>
  </div>
</template>
