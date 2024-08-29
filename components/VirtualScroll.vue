<script lang="ts" setup>
import { clamp } from '~/utils/ea'

interface IProps {
  items: any[]
  itemHeight?: number
  tag?: string
}

const props = withDefaults(defineProps<IProps>(), {
  tag: 'div',
  itemHeight: 35,
})

const emit = defineEmits(['update:activeItems'])
const $el = ref<HTMLElement | null>(null)

const windowHeight = 204
const overscan = 5

const scrollTop = ref(0)

const numberOfItems = computed(() => props.items.length)

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - overscan)
)

const renderedNodesCount = computed(() =>
  Math.min(
    numberOfItems.value - startIndex.value,
    Math.floor(windowHeight / props.itemHeight) + 2 * overscan
  )
)

const activeItems = computed(() => {
  return props.items.slice(
    startIndex.value,
    startIndex.value + renderedNodesCount.value
  )
})

watch(activeItems, () => {
  emit('update:activeItems', activeItems.value)
})

const onScroll = e => {
  scrollTop.value = e.currentTarget.scrollTop
}

onMounted(() => {
  emit('update:activeItems', activeItems.value)
})
</script>

<template>
  <component
    ref="$el"
    :is="tag"
    class="virtual-scroll"
    :style="{
      '--max-height': `${windowHeight}px`,
    }"
    @scroll="onScroll"
  >
    <div
      :style="{
        height: `${numberOfItems * itemHeight}px`,
      }"
    >
      <div
        :style="{
          transform: `translateY(${startIndex * itemHeight}px)`,
        }"
      >
        <slot />
      </div>
    </div>
  </component>
</template>
