<script setup lang="ts">
interface iProps {
  id: string
  value: string
  name: string
  type?: string
  disabled?: boolean
  checked?: boolean
}

defineProps<iProps>()

const emit = defineEmits(['inputValue'])
</script>

<template>
  <label
    :for="id"
    class="checkbox-input"
    :class="disabled && 'checkbox-input--disabled'"
  >
    <span class="checkbox-input__text">
      {{ value }}
    </span>
    <input
      :id="id"
      :type="type"
      :name="name"
      :value="value"
      :disabled="disabled"
      class="checkbox-input__type"
      :checked="checked"
      @change="emit('inputValue', value)"
    />
    <span class="checkbox-input__checkmark">
      <IconsCheck />
    </span>
  </label>
</template>
