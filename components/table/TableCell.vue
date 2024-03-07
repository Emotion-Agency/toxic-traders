<script setup lang="ts">
interface iProps {
  broker: string | null
}

defineProps<iProps>()
</script>

<template>
  <td>
    {{ broker }}
  </td>
</template>
