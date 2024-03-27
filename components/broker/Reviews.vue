<script setup lang="ts">
interface iProps {
  reviewsList: { rating: string; count: string }[]
}

defineProps<iProps>()

const reviewsInputData = ref([
  {
    title: 'Trustpilot',
    input: [
      {
        required: false,
        id: 'trustpilot-link',
        name: 'Link',
        type: 'text',
        value: '',
        placeholder: 'Link',
      },
      {
        required: false,
        id: 'trustpilot-count',
        name: 'Reviews count',
        type: 'text',
        value: '',
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: 'trustpilot-rating',
        name: 'Rating',
        type: 'text',
        value: '',
        placeholder: 'Rating from 0 to 5',
      },
    ],
  },
  {
    title: 'ForexPeaceArmy',
    input: [
      {
        required: false,
        id: 'forexpeacearmy-link',
        name: 'Link',
        type: 'text',
        value: '',
        placeholder: 'Link',
      },
      {
        required: false,
        id: 'forexpeacearmy-count',
        name: 'Reviews count',
        type: 'text',
        value: '',
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: 'forexpeacearmy-rating',
        name: 'Rating',
        type: 'text',
        value: '',
        placeholder: 'Rating from 0 to 5',
      },
    ],
  },
  {
    title: 'WikiFx',
    input: [
      {
        required: false,
        id: 'wikifx-link',
        name: 'Link',
        type: 'text',
        value: '',
        placeholder: 'Link',
      },
      {
        required: false,
        id: 'wikifx-count',
        name: 'Reviews count',
        type: 'text',
        value: '',
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: 'wikifx-rating',
        name: 'Rating',
        type: 'text',
        value: '',
        placeholder: 'Rating from 0 to 5',
      },
    ],
  },
  {
    title: 'fx123',
    input: [
      {
        required: false,
        id: 'fx123-link',
        name: 'Link',
        type: 'text',
        value: '',
        placeholder: 'Link',
      },
      {
        required: false,
        id: 'fx123-count',
        name: 'Reviews count',
        type: 'text',
        value: '',
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: 'fx123-rating',
        name: 'Rating',
        type: 'text',
        value: '',
        placeholder: 'Rating from 0 to 5',
      },
    ],
  },
])

const reviewsModalOpened = ref(false)

const reviewsModalOpen = () => {
  reviewsModalOpened.value = true
  document.body.classList.add('modal-open')
}

const reviewsModalClose = () => {
  reviewsModalOpened.value = false
}

const onInputChange = (e: iInputData) => {
  reviewsInputData.value = reviewsInputData.value.map(item => {
    item.input.map(input => {
      if (input.id === e.id) {
        input.value = e.value
      }
      return input
    })
    return item
  })
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
      <div
        v-for="(item, idx) in reviewsInputData"
        :key="idx"
        class="reviews__item"
      >
        <p class="reviews__item-title">
          {{ item.title }}
        </p>
        <TheInput
          v-for="(input, index) in item.input"
          :id="input.id"
          :key="index"
          :required="input.required"
          :name="input.name"
          :type="input.type"
          :placeholder="input.placeholder"
          @input-value="onInputChange"
        />
      </div>
      <TheButton
        class="reviews__item-btn"
        tag="button"
        variant="fill"
        button-size="medium"
      >
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
