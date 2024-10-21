<script setup lang="ts">
interface iProps {
  item: string | number | null
  isSort?: boolean
  sortOrder?: 1 | 2
  isActive?: boolean
}

const props = defineProps<iProps>()

const emit = defineEmits(['sort', 'open', 'clickCustomComponent'])

const onSort = () => {
  emit('sort', props.item)
}
</script>

<template>
  <div class="table-cell" :title="item?.toString()">
    <button v-if="isSort" class="table-cell__btn" @click="onSort">
      <slot />
      <IconsDownArrow v-if="sortOrder === 1 && isActive" />
      <IconsUpArrow v-else-if="sortOrder === 2 && isActive" />
      <IconsDownUpArrow v-else />
    </button>

    <div v-else class="table-cell__content">
      <slot />
    </div>
  </div>
</template>
