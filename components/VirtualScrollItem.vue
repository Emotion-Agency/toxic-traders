<script lang="ts" setup>
interface IProps {
  index: number
  itemHeight: number
  tag?: string
}

withDefaults(defineProps<IProps>(), {
  index: 0,
  itemHeight: 35,
  tag: 'div',
})
</script>

<template>
  <component
    :is="tag"
    :style="{
      height: `${itemHeight}px`,
    }"
    class="virtual-scroll-item"
  >
    <slot />
  </component>
</template>
