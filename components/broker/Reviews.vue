<script setup lang="ts">
import { initialReviews } from '~/data/initialReviews'
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  brokerId: number
}

interface iReviewsInput {
  title?: string
  input?: {
    required: boolean
    id: string
    name: string
    type: string
    value: string
    placeholder: string
    min?: number
    max?: number
  }[]
}

const props = defineProps<iProps>()

const { getReviews, updateReview, createReview } = useBrokerReviews()
const reviewsModalOpened = ref(false)
const reviewsList = ref<iBrokerReviewsItem[]>([])
const reviewsInputs = ref<iReviewsInput[]>([])

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

const onSave = () => {
  const dataToSave = reviewsInputs.value.map(item => {
    return {
      serviceName: item.title,
      url: item.input.find(el => el.name === 'Link').value,
      numberOfReviews: +item.input.find(el => el.name === 'Reviews count')
        .value,
      rating: +item.input.find(el => el.name === 'Rating').value,
      id: reviewsList.value.find(el => el.serviceName === item.title)?.id,
    }
  })

  dataToSave.forEach(async item => {
    if (reviewsList.value.length) {
      await updateReview(
        item.id,
        item.serviceName,
        item.url,
        item.rating,
        item.numberOfReviews
      )

      return
    }

    await createReview(
      props.brokerId,
      item.url,
      item.rating,
      item.numberOfReviews,
      item.serviceName
    )
  })

  reviewsList.value = dataToSave

  reviewsModalClose()
}

watchEffect(() => {
  const reviews = reviewsList.value?.length ? reviewsList.value : initialReviews

  reviewsInputs.value = reviews.map(item => ({
    title: item.serviceName,
    input: [
      {
        required: false,
        id: `${item.serviceName}-link`,
        name: 'Link',
        type: 'text',
        value: item.url,
        placeholder: 'Link',
      },
      {
        required: false,
        id: `${item.serviceName}-count`,
        name: 'Reviews count',
        type: 'number',
        value: item.numberOfReviews.toString(),
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: `${item.serviceName}-rating`,
        name: 'Rating',
        type: 'number',
        value: item.rating.toString(),
        placeholder: 'Rating from 0 to 5',
        min: 0,
        max: 5,
      },
    ],
  }))
})

onMounted(async () => {
  const data = await getReviews(props.brokerId)

  if (data) {
    reviewsList.value = Object.values(data)?.filter(
      el => typeof el !== 'string'
    )
  }

  console.log(reviewsList?.value.length)
})
</script>

<template>
  <div class="reviews">
    <TheAccordion
      title="Reviews"
      additional-button="Edit"
      @open="reviewsModalOpen"
    >
      <div v-if="reviewsList?.length" class="reviews__content">
        <BrokerReviewsItem
          v-for="(item, idx) in reviewsList"
          :key="idx"
          :rating="item?.rating"
          :reviews-count="item?.numberOfReviews"
          :review-link="item?.url"
        >
          <IconsReviewsForexPeaceArmy
            v-if="item?.serviceName.toLowerCase() === 'forexpeacearmy'"
          />
          <IconsReviewsTrustpilot
            v-if="item?.serviceName.toLowerCase() === 'trustpilot'"
          />
          <IconsReviewsWikifx
            v-if="item?.serviceName.toLowerCase() === 'wikifx'"
          />
          <IconsReviewsFx123
            v-if="item?.serviceName.toLowerCase() === 'forexratings'"
          />
        </BrokerReviewsItem>
      </div>

      <div v-else class="reviews__content">
        <BrokerReviewsItem
          v-for="(_, idx) in 4"
          :key="idx"
          :rating="0"
          :reviews-count="0"
        >
          <IconsReviewsForexPeaceArmy v-if="idx === 0" />
          <IconsReviewsTrustpilot v-if="idx === 1" />
          <IconsReviewsWikifx v-if="idx === 2" />
          <IconsReviewsFx123 v-if="idx === 3" />
        </BrokerReviewsItem>
      </div>
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
          :min="input.min"
          :max="input.max"
          @input-value="onInputChange"
        />
      </div>
      <TheButton
        class="reviews__item-btn"
        tag="button"
        variant="fill"
        button-size="medium"
        @click="onSave"
      >
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
