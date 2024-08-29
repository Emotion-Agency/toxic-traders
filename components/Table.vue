<script lang="ts" setup>
import { raf } from '~/utils/ea'

interface iProps {
  withLog?: boolean
}

defineProps<iProps>()

const $table = ref<HTMLElement | null>(null)
const columnsCount = ref(0)

const detectTableWidth = () => {
  const $rows = $table.value?.querySelectorAll('.table-row')

  if (!$rows) return

  const $firstRow = $rows[0]

  if (!$firstRow) return

  const $cells = $firstRow.querySelectorAll('.table-cell')

  if (!$cells) return

  if (columnsCount.value === $cells.length) return

  columnsCount.value = $cells.length
}

onMounted(() => {
  raf.on(detectTableWidth)
})

onBeforeUnmount(() => {
  raf.off(detectTableWidth)
})
</script>

<template>
  <div ref="$table" class="table" :style="{ '--columns-count': columnsCount }">
    <div ref="$tableWrapper" class="table__wrapper">
      <slot />
    </div>
    <CustomScrollbar axis="y" />
    <CustomScrollbar axis="x" />
  </div>
</template>
