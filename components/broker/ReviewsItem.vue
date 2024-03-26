<script setup lang="ts">
interface iProps {
  rating: string
  reviewsCount: string
}

const props = defineProps<iProps>()

const filledStars = computed(() => {
  const rating = parseInt(props.rating)
  return rating > 0 ? rating : 0
})
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
          <IconsStar v-if="idx >= filledStars" />
          <IconsFilledStar v-else />
        </li>
      </ul>
    </div>
    <p class="reviews-item__count">{{ reviewsCount }} reviews</p>
  </a>
</template>
