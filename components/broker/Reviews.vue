<script setup lang="ts">
import type { iInput, iSelectInput } from '~/types'
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  brokerId: number
}

interface iReviewsInput {
  required?: boolean
  id: string
  name: string
  type?: string
  value: string
  placeholder: string
  min?: number
  max?: number
  title?: string
  options?: string[]
}

const props = defineProps<iProps>()

const services = ['Trustpilot', 'ForexPeaceArmy', 'Wikifx', 'Fx123']

const { getReviews, updateReview, createReview, deleteReview } =
  useBrokerReviews()
const reviewsModalOpened = ref(false)
const reviewsList = ref<iBrokerReviewsItem[]>([])

const availableServices = computed(() => {
  const allReviewsServices = reviewsList.value.map(item =>
    item.serviceName.toLowerCase()
  )

  return services.filter(
    service => !allReviewsServices.includes(service.toLowerCase())
  )
})

const reviewsInputs = ref<iReviewsInput[]>([
  {
    type: 'select',
    id: `review-service`,
    name: 'service',
    placeholder: 'Choose Service',
    value: '',
  },
  {
    required: false,
    id: `review-link`,
    name: 'Link',
    type: 'text',
    value: '',
    placeholder: 'Link',
  },
  {
    required: false,
    id: `review-count`,
    name: 'Reviews count',
    type: 'number',
    value: '',
    placeholder: 'Reviews count',
  },
  {
    required: false,
    id: `review-rating`,
    name: 'Rating',
    type: 'number',
    value: '',
    placeholder: 'Rating from 0 to 5',
    min: 0,
    max: 5,
  },
])

const reviewsModalOpen = () => {
  reviewsModalOpened.value = true
  document.body.classList.add('modal-open')
}

const reviewsModalClose = () => {
  reviewsModalOpened.value = false
}

onMounted(async () => {
  const data = await getReviews(props.brokerId)

  reviewsList.value = data
})

const onInputChange = (e: iInput) => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }
    return item
  })
}

const onSelectChange = (_: string, e: iSelectInput) => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }
    return item
  })
}

const resetInputs = () => {
  reviewsInputs.value = reviewsInputs.value.map(item => {
    item.value = ''
    return item
  })
}

const onAddClick = async () => {
  const serviceName = reviewsInputs.value.find(
    el => el.name === 'service'
  ).value

  const url = reviewsInputs.value.find(el => el.name === 'Link').value

  const numberOfReviews = +reviewsInputs.value.find(
    el => el.name === 'Reviews count'
  ).value

  const rating = +reviewsInputs.value.find(el => el.name === 'Rating').value

  await createReview(props.brokerId, url, rating, numberOfReviews, serviceName)

  reviewsModalClose()

  resetInputs()

  const data = await getReviews(props.brokerId)

  reviewsList.value = data
}
</script>

<template>
  <div class="reviews">
    <TheAccordion
      title="Reviews"
      :additional-button="reviewsList.length >= 4 ? null : 'Add new'"
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
        <p class="reviews__content-text">No reviews yet</p>
      </div>
    </TheAccordion>
    <TheModal
      :modal-opened="reviewsModalOpened"
      title="Add new review"
      @close="reviewsModalClose"
    >
      <div
        v-for="(input, index) in reviewsInputs"
        :key="index"
        class="review__input-item"
      >
        <CustomSelect
          v-if="input.type === 'select'"
          :id="input.id"
          :name="input.name"
          :options="availableServices"
          :placeholder="input.placeholder"
          :value="input.value"
          @select="onSelectChange"
        />
        <TheInput
          v-else
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
      <div class="reviews__buttons">
        <TheButton
          tag="button"
          variant="close"
          button-size="medium"
          @click="reviewsModalClose"
        >
          Close
        </TheButton>
        <TheButton
          tag="button"
          variant="fill"
          button-size="medium"
          @click="onAddClick"
        >
          Add
        </TheButton>
      </div>
    </TheModal>
  </div>
</template>
