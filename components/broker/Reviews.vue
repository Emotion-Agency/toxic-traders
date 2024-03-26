<script setup lang="ts">
interface iProps {
  reviewsList: { rating: string; count: string }[]
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
        :rating="reviewsList[0]?.rating ?? '0.0'"
        :reviews-count="reviewsList[0]?.count ?? '0.0'"
      >
        <IconsReviewsForexPeaceArmy />
      </BrokerReviewsItem>
      <BrokerReviewsItem
        :rating="reviewsList[1]?.rating ?? '0.0'"
        :reviews-count="reviewsList[1]?.count ?? '0.0'"
      >
        <IconsReviewsTrustpilot />
      </BrokerReviewsItem>
      <BrokerReviewsItem
        :rating="reviewsList[2]?.rating ?? '0.0'"
        :reviews-count="reviewsList[2]?.count ?? '0.0'"
      >
        <IconsReviewsWikifx />
      </BrokerReviewsItem>
      <BrokerReviewsItem
        :rating="reviewsList[3]?.rating ?? '0.0'"
        :reviews-count="reviewsList[3]?.count ?? '0.0'"
      >
        <IconsReviewsFx123 />
      </BrokerReviewsItem>
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
