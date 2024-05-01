<script setup lang="ts">
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const { getReviews, createReview } = useBrokerReviews()
const reviewsModalOpened = ref(false)
const reviewsList = ref<iBrokerReviewsItem[]>([])
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

const onSave = async () => {
  for (const item of reviewsInputs.value) {
    let link, rating, count

    console.log('Service name:', item.serviceName)

    switch (item.serviceName) {
      case 'trustpilot':
        link = item['trustpilot-link']
        rating = item['trustpilot-rating']
        count = item['trustpilot-count']
        break
      case 'forexpeacearmy':
        link = item['forexpeacearmy-link']
        rating = item['forexpeacearmy-rating']
        count = item['forexpeacearmy-count']
        break
      case 'wikifx':
        link = item['wikifx-link']
        rating = item['wikifx-rating']
        count = item['wikifx-count']
        break
      case 'forexratings':
        link = item['forexratings-link']
        rating = item['forexratings-rating']
        count = item['forexratings-count']
        break
      default:
        console.log('Unknown service name:', item.serviceName)
        continue
    }

    console.log('Link:', link)
    console.log('Rating:', rating)
    console.log('Count:', count)

    await createReview(props.brokerId, link, rating, count, item.serviceName)
  }

  reviewsModalClose()
}

watch(
  () => reviewsList.value,
  () => {
    reviewsInputs.value = reviewsList.value.map(item => ({
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
          value: item.numberOfReviews,
          placeholder: 'Reviews count',
        },
        {
          required: false,
          id: `${item.serviceName}-rating`,
          name: 'Rating',
          type: 'number',
          value: item.rating,
          placeholder: 'Rating from 0 to 5',
        },
      ],
    }))
  }
)

onMounted(async () => {
  const data = await getReviews(props.brokerId)

  reviewsList.value = Object.values(data).filter(el => typeof el !== 'string')
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
        v-for="(item, idx) in reviewsList"
        :key="idx"
        :rating="item.rating"
        :reviews-count="item.numberOfReviews"
        :review-link="item.url"
      >
        <IconsReviewsForexPeaceArmy
          v-if="item.serviceName.toLowerCase() === 'forexpeacearmy'"
        />
        <IconsReviewsTrustpilot
          v-if="item.serviceName.toLowerCase() === 'trustpilot'"
        />
        <IconsReviewsWikifx
          v-if="item.serviceName.toLowerCase() === 'wikifx'"
        />
        <IconsReviewsFx123
          v-if="item.serviceName.toLowerCase() === 'forexratings'"
        />
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
        @click="onSave"
      >
        Save
      </TheButton>
    </TheModal>
  </div>
</template>
