<script setup lang="ts">
interface iProps {
  item: string | null
}

defineProps<iProps>()
</script>

<template>
  <div class="table-cell">
    {{ item }}
  </div>
</template>
