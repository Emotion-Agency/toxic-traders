<script setup lang="ts">
interface iProps {
  item: string | null
}

defineProps<iProps>()
</script>

<template>
  <div class="table-cell">
    <p class="table-cell__text">
      {{ item }}
    </p>
  </div>
</template>
