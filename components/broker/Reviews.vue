<script setup lang="ts">
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
      Reviews
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
