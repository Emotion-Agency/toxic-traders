<script setup lang="ts">
interface iProps {
  item: string | null
}

defineProps<iProps>()
</script>

<template>
  <td>
    {{ item }}
  </td>
</template>
