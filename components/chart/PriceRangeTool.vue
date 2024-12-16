<script lang="ts" setup>
interface IProps {
  firstCoord: { x: number; y: number }
  lastCoord: { x: number; y: number }
}

defineProps<IProps>()

const $el = ref<SVGElement | null>(null)

defineExpose({
  $el,
})
</script>

<template>
  <svg ref="$el" class="svg-overlay">
    <circle
      v-if="firstCoord.x"
      :cx="firstCoord.x"
      :cy="firstCoord.y"
      r="3"
      fill="var(--primary-default)"
    />
    <line
      v-if="firstCoord.x && lastCoord.x && firstCoord.y && lastCoord.y"
      :x1="firstCoord.x"
      :y1="firstCoord.y"
      :x2="lastCoord.x"
      :y2="lastCoord.y"
      stroke="var(--primary-default)"
      stroke-width="2"
    />
    <circle
      v-if="lastCoord.x"
      :cx="lastCoord.x"
      :cy="lastCoord.y"
      r="3"
      fill="var(--primary-default)"
    />
    <foreignObject x="0" y="0" width="100%" height="100%">
      <slot />
    </foreignObject>
  </svg>
</template>
