<script lang="ts" setup>
interface IProps {
  impact: 1 | 2 | 3
}

defineProps<IProps>()
</script>

<template>
  <div class="impact" :class="`impact--${impact}`">
    <IconsBull />
    <IconsBull />
    <IconsBull />
  </div>
</template>
