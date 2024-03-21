<script setup lang="ts">
interface iProps {
  rating: string | null
  reviewsCount: string | null
}

defineProps<iProps>()
</script>

<template>
  <div class="reviews-item">
    {{ reviewsCount ?? 0 }}
    {{ rating ?? 0 }}
  </div>
</template>
