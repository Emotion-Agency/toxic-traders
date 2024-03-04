<script setup lang="ts">
interface iProps {
  id: string
  option: string
  name: string
  type?: string
  disabled?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['inputValue'])
</script>

<template>
  <label
    :for="option"
    class="checkbox-input"
    :class="disabled && 'checkbox-input--disabled'"
  >
    <span class="checkbox-input__text">
      {{ option }}
    </span>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="option"
      :disabled="disabled"
      class="checkbox-input__type"
      @change="emit('inputValue', option)"
    />
    <span class="checkbox-input__checkmark">
      <IconsCheck />
    </span>
  </label>
</template>
