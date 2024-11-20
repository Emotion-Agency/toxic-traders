<script setup lang="ts">
interface iProps {
  item: string | number | null | undefined
  isSort?: boolean
  sortOrder?: 1 | 2
  isActive?: boolean
  disableTooltip?: boolean
  tooltipText?: string
}

const props = defineProps<iProps>()

const emit = defineEmits(['sort', 'open', 'clickCustomComponent'])

const onSort = () => {
  emit('sort', props.item)
}
</script>

<template>
  <div class="table-cell">
    <button v-if="isSort" class="table-cell__btn" @click="onSort">
      <slot />
      <IconsDownArrow v-if="sortOrder === 1 && isActive" />
      <IconsUpArrow v-else-if="sortOrder === 2 && isActive" />
      <IconsDownUpArrow v-else />
    </button>

    <HeadlessTooltip v-else-if="!isSort && !disableTooltip">
      <template #trigger>
        <div class="table-cell__content">
          <slot />
        </div>
      </template>
      <span v-if="tooltipText">{{ tooltipText }}</span>
      <slot v-else />
    </HeadlessTooltip>
    <div v-else class="table-cell__content">
      <slot />
    </div>
  </div>
</template>
