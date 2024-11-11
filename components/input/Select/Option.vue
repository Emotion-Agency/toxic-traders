<script lang="ts" setup>
interface IProps {
  index: number
  option: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['select'])

const selectItem = inject('selectItem') as (option: string) => void

const onSelect = () => {
  selectItem(props.option)
  emit('select', props.option)
}
</script>

<template>
  <VirtualScrollItem
    class="custom-select__item"
    :item-height="35"
    :index="index"
    @click="onSelect"
  >
    <p class="custom-select__item-text">
      {{ option }}
    </p>
  </VirtualScrollItem>
</template>
