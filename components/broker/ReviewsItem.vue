<script setup lang="ts">
interface iProps {
  rating: string
  reviewsCount: string
}

defineProps<iProps>()
</script>

<template>
  <a href="/" target="_blank" rel="noreferer noopener" class="reviews-item">
    <div class="reviews-item__rating-wrapper">
      <div class="reviews-item__rating">
        <slot />
        <p class="reviews-item__rating-text">
          {{ rating }}
        </p>
      </div>
      <ul class="reviews-item__list">
        <li v-for="(_, idx) in 5" :key="idx" class="reviews-item__star">
          <IconsStar />
          <IconsFilledStar />
        </li>
      </ul>
    </div>
    <p class="reviews-item__count">{{ reviewsCount }} reviews</p>
  </a>
</template>
