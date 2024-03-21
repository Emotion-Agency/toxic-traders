<script lang="ts" setup>
const $table = ref<HTMLElement | null>(null)
const isFullWidth = ref(false)
const observer = ref<MutationObserver>(null)

const detectTableWidth = () => {
  const $tableWrapper = $table.value.querySelector(
    '.table__wrapper'
  ) as HTMLElement

  const containerWidth = $table.value.offsetWidth
  const bodyWidth = $tableWrapper.scrollWidth

  isFullWidth.value = bodyWidth <= containerWidth

  console.log(containerWidth, bodyWidth)
}

onMounted(() => {
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  }

  const callback = () => {
    detectTableWidth()
  }

  observer.value = new MutationObserver(callback)

  observer.value.observe($table.value, config)
})

onBeforeUnmount(() => {
  observer.value.disconnect()
})
</script>

<template>
  <div ref="$table" class="table" :class="isFullWidth && 'table--full-width'">
    <div class="table__wrapper">
      <slot />
    </div>
  </div>
</template>
