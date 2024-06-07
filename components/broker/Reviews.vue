<script setup lang="ts">
import type { iSelectInput } from '~/types'
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  brokerId: number
}

interface iReviewsInput {
  title?: string
  input?: {
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
  }[]
}

const props = defineProps<iProps>()

const services = ['Trustpilot', 'ForexPeaceArmy', 'Wikifx', 'Fx123']

const { getReviews, updateReview, createReview, deleteReview } =
  useBrokerReviews()
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

const onSelectChange = (_, e: iSelectInput) => {
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
      serviceName: item.input.find(el => el.name === 'service').value,
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

onMounted(async () => {
  const data = await getReviews(props.brokerId)

  console.log(data)

  if (data) {
    reviewsList.value = Object.values(data)?.filter(
      el => !!el && typeof el !== 'string'
    )
  }
})

const reviewListSelectedServices = computed(() => {
  return reviewsList.value?.map(item => item.serviceName)
})

watchEffect(() => {
  console.log(reviewsList.value)
  reviewsInputs.value = reviewsList.value.map((item, idx) => ({
    title: `#${idx + 1}`,
    input: [
      {
        id: `_${idx}-service`,
        name: 'service',

        placeholder: 'Choose Service',
        options: services,
        value: item.serviceName,
      },
      {
        required: false,
        id: `_${idx}-link`,
        name: 'Link',
        type: 'text',
        value: item.url,
        placeholder: 'Link',
      },
      {
        required: false,
        id: `_${idx}-count`,
        name: 'Reviews count',
        type: 'number',
        value: item.numberOfReviews.toString(),
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: `_${idx}-rating`,
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

const addNewReviewInput = () => {
  if (reviewsInputs.value.length >= 4) {
    return
  }

  const currentIdx = reviewsInputs.value.length

  const newItem = {
    title: `#${currentIdx + 1}`,
    input: [
      {
        id: `_${currentIdx}-service`,
        name: 'service',

        placeholder: 'Choose Service',
        options: services.filter(
          service => !reviewListSelectedServices.value.includes(service)
        ),
        value: '',
      },
      {
        id: `_${currentIdx}-link`,
        name: 'Link',
        required: false,
        type: 'text',
        value: '',
        placeholder: 'Link',
      },
      {
        required: false,
        id: `_${currentIdx}-count`,
        name: 'Reviews count',
        type: 'number',
        value: '',
        placeholder: 'Reviews count',
      },
      {
        required: false,
        id: `_${currentIdx}-rating`,
        name: 'Rating',
        type: 'number',
        value: '',
        placeholder: 'Rating from 0 to 5',
        min: 0,
        max: 5,
      },
    ],
  }

  reviewsInputs.value = [...reviewsInputs.value, newItem]
}

const removeReviewInput = async (idx: number) => {
  await deleteReview(reviewsList.value[idx].id)
  reviewsInputs.value = reviewsInputs.value.filter((_, index) => index !== idx)
}
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
        <p class="reviews__content-text">No reviews yet</p>
      </div>
    </TheAccordion>
    <TheModal
      :modal-opened="reviewsModalOpened"
      title="Edit reviews"
      @close="reviewsModalClose"
    >
      <TheAccordion
        v-for="(item, idx) in reviewsInputs"
        :key="idx"
        :title="'#' + (idx + 1)"
        additional-button="Remove"
        class="reviews__item"
        @action-click="removeReviewInput(idx)"
      >
        <div
          v-for="(input, index) in item.input"
          :key="index"
          class="review__input-item"
        >
          <CustomSelect
            v-if="input.options"
            :id="input.id"
            :name="input.name"
            :options="input.options"
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
      </TheAccordion>
      <TheButton
        v-if="reviewsInputs?.length < 4"
        tag="button"
        variant="outlined"
        button-size="medium"
        class="reviews__add-btn"
        @click="addNewReviewInput"
      >
        <template #start-icon>
          <IconsPlus />
        </template>
        Add new
      </TheButton>
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
