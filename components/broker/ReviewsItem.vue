<script setup lang="ts">
interface iProps {
  rating?: number
  reviewsCount?: number
  reviewLink?: string
}

const props = defineProps<iProps>()

const filledStars = computed(() => {
  return props.rating > 0 ? props.rating : 0
})
</script>

<template>
  <a
    :href="reviewLink"
    target="_blank"
    rel="noreferer noopener"
    class="reviews-item"
  >
    <div class="reviews-item__rating-wrapper">
      <div class="reviews-item__rating">
        <slot />
        <p class="reviews-item__rating-text">
          {{ rating || 0 }}
        </p>
      </div>
      <ul class="reviews-item__list">
        <li v-for="(_, idx) in 5" :key="idx" class="reviews-item__star">
          <IconsStar v-if="idx >= filledStars" />
          <IconsFilledStar v-else />
        </li>
      </ul>
    </div>
    <p class="reviews-item__count">{{ reviewsCount || 0 }} reviews</p>
  </a>
</template>
