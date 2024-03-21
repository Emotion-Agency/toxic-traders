<script setup lang="ts">
interface iProps {
  reviewsList: {
    rating: string | null
    reviewsCount: string | null
  }[]
}

defineProps<iProps>()

const reviewsModalOpened = ref(false)

const reviewsModalOpen = () => {
  reviewsModalOpened.value = true
  document.body.classList.add('modal-open')
}

const reviewsModalClose = () => {
  reviewsModalOpened.value = false
}
</script>

<template>
  <div class="reviews">
    <TheAccordion
      title="Reviews"
      additional-button="Edit"
      @open="reviewsModalOpen"
    >
      <BrokerReviewsItem
        v-for="(item, idx) in reviewsList"
        :key="idx"
        :rating="item.rating"
        :reviews-count="item.reviewsCount"
      />
    </TheAccordion>
    <TheModal
      :modal-opened="reviewsModalOpened"
      title="Edit reviews"
      @close="reviewsModalClose"
    >
      <TheButton tag="button" variant="fill" button-size="medium">
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
