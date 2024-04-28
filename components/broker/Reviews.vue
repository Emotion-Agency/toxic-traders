<script setup lang="ts">
import type {
  iBrokerReviews,
  iBrokerReviewsItem,
} from '~/types/broker/brokerReviews'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getReviews, createReview } = useBrokerReviews()
const reviewsModalOpened = ref(false)
const reviewsList = ref<iBrokerReviews>({})
const forexPeaceArmy = ref<iBrokerReviewsItem>({})
const forexRatings = ref<iBrokerReviewsItem>({})
const trustPilot = ref<iBrokerReviewsItem>({})
const wikiFx = ref<iBrokerReviewsItem>({})
const reviewsInputs = ref([])

const reviewsModalOpen = () => {
  reviewsModalOpened.value = true
  document.body.classList.add('modal-open')
}

const reviewsModalClose = () => {
  reviewsModalOpened.value = false
}

const onInputChange = (e: iInputData) => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    item.input.map(input => {
      if (input.id === e.id) {
        input.value = e.value
      }
      return input
    })
    return item
  })
}

watch(
  () => reviewsList.value,
  () => {
    reviewsInputs.value = [
      {
        title: trustPilot?.value.serviceName,
        input: [
          {
            required: false,
            id: 'trustpilot-link',
            name: 'Link',
            type: 'text',
            value: trustPilot?.value.url,
            placeholder: 'Link',
          },
          {
            required: false,
            id: 'trustpilot-count',
            name: 'Reviews count',
            type: 'number',
            value: trustPilot?.value.numberOfReviews,
            placeholder: 'Reviews count',
          },
          {
            required: false,
            id: 'trustpilot-rating',
            name: 'Rating',
            type: 'number',
            value: trustPilot?.value.rating,
            placeholder: 'Rating from 0 to 5',
          },
        ],
      },
      {
        title: forexPeaceArmy?.value.serviceName,
        input: [
          {
            required: false,
            id: 'forexpeacearmy-link',
            name: 'Link',
            type: 'text',
            value: forexPeaceArmy?.value.url,
            placeholder: 'Link',
          },
          {
            required: false,
            id: 'forexpeacearmy-count',
            name: 'Reviews count',
            type: 'number',
            value: forexPeaceArmy?.value.numberOfReviews,
            placeholder: 'Reviews count',
          },
          {
            required: false,
            id: 'forexpeacearmy-rating',
            name: 'Rating',
            type: 'number',
            value: forexPeaceArmy?.value.rating,
            placeholder: 'Rating from 0 to 5',
          },
        ],
      },
      {
        title: wikiFx?.value.serviceName,
        input: [
          {
            required: false,
            id: 'wikifx-link',
            name: 'Link',
            type: 'text',
            value: wikiFx?.value.url,
            placeholder: 'Link',
          },
          {
            required: false,
            id: 'wikifx-count',
            name: 'Reviews count',
            type: 'number',
            value: wikiFx?.value.numberOfReviews,
            placeholder: 'Reviews count',
          },
          {
            required: false,
            id: 'wikifx-rating',
            name: 'Rating',
            type: 'number',
            value: wikiFx?.value.rating,
            placeholder: 'Rating from 0 to 5',
          },
        ],
      },
      {
        title: forexRatings?.value.serviceName,
        input: [
          {
            required: false,
            id: 'fx123-link',
            name: 'Link',
            type: 'text',
            value: forexRatings?.value.url,
            placeholder: 'Link',
          },
          {
            required: false,
            id: 'fx123-count',
            name: 'Reviews count',
            type: 'number',
            value: forexRatings?.value.numberOfReviews,
            placeholder: 'Reviews count',
          },
          {
            required: false,
            id: 'fx123-rating',
            name: 'Rating',
            type: 'number',
            value: forexRatings?.value.rating,
            placeholder: 'Rating from 0 to 5',
          },
        ],
      },
    ]
  }
)

onMounted(async () => {
  reviewsList.value = await getReviews(props.brokerId)
  forexPeaceArmy.value = reviewsList?.value?.forexpeacearmy
  trustPilot.value = reviewsList?.value?.trustpilot
  wikiFx.value = reviewsList?.value?.wikifx
  forexRatings.value = reviewsList?.value?.forexratings

  console.log(
    forexPeaceArmy.value,
    trustPilot.value,
    wikiFx.value,
    forexRatings.value
  )
})
</script>

<template>
  <div class="reviews">
    <TheAccordion
      title="Reviews"
      additional-button="Edit"
      @open="reviewsModalOpen"
    >
      <BrokerReviewsItem
        :rating="forexPeaceArmy?.rating"
        :reviews-count="forexPeaceArmy?.numberOfReviews"
        :review-link="forexPeaceArmy?.url"
      >
        <IconsReviewsForexPeaceArmy />
      </BrokerReviewsItem>
      <BrokerReviewsItem
        :rating="trustPilot?.rating"
        :reviews-count="trustPilot?.numberOfReviews"
        :review-link="trustPilot?.url"
      >
        <IconsReviewsTrustpilot />
      </BrokerReviewsItem>
      <BrokerReviewsItem
        :rating="wikiFx?.rating"
        :reviews-count="wikiFx?.numberOfReviews"
        :review-link="wikiFx?.url"
      >
        <IconsReviewsWikifx />
      </BrokerReviewsItem>
      <BrokerReviewsItem
        :rating="forexRatings?.rating"
        :reviews-count="forexRatings?.numberOfReviews"
        :review-link="forexRatings?.url"
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
        v-for="(item, idx) in reviewsInputs"
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
          :value="input.value.toString()"
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
