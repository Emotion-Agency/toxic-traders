<script lang="ts" setup>
interface IProps {
  coords: {
    x: number
    y: number
  }
}

const props = defineProps<IProps>()
const $el = ref<HTMLElement | null>(null)

const tooltipPos = computed(() => {
  if (!$el.value) {
    return {
      top: '0',
      left: '0',
    }
  }
  const tooltipBounds = $el.value?.getBoundingClientRect()

  const coords = {
    top: `${props.coords.y - tooltipBounds.height - 5}px`,
    left: `${props.coords.x - tooltipBounds.width}px`,
  }

  if (props.coords.x - tooltipBounds.width < 0) {
    coords.left = `${props.coords.x}px`
  }

  if (props.coords.y - tooltipBounds.height < 0) {
    coords.top = `${props.coords.y + 10}px`
  }

  return coords
})
</script>

<template>
  <div
    ref="$el"
    class="prt-tooltip"
    :style="`transform: translate(${tooltipPos.left}, ${tooltipPos.top})`"
  >
    <slot />
  </div>
</template>
