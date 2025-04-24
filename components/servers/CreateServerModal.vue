<script lang="ts" setup>
import type { iServersData } from '~/pages/servers.vue'
import type { iInput, iSelectInput } from '~/types'
import type { iBrokerReviewsItem } from '~/types/broker/brokerReviews'

interface iProps {
  modalOpened: boolean
  servers: iServersData[]
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'created'])

interface iServersInput {
  required?: boolean
  id: string
  name: string
  type?: string
  value: string
  placeholder: string
  title?: string
  options?: string[]
}

const serversInputs = ref<iServersInput[]>([
  {
    required: false,
    id: `servers-name`,
    title: 'Name',
    name: 'Name',
    type: 'text',
    value: '',
    placeholder: 'Server name',
  },
  {
    required: false,
    id: `servers-address`,
    title: 'IP',
    name: 'Address',
    type: 'text',
    value: '',
    placeholder: '42.42.42.42',
  },
  {
    type: 'select',
    id: `servers-port`,
    title: 'Port',
    name: 'Port',
    placeholder: '0042',
    value: '',
  },
])

const onInputChange = (e: iInput) => {
  serversInputs.value = serversInputs.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }
    return item
  })
}

const onSelectChange = (e: iSelectInput) => {
  serversInputs.value = serversInputs.value.map(item => {
    if (item.id === e.id) {
      item.value = e.value
    }
    return item
  })
}

const resetInputs = () => {
  serversInputs.value = serversInputs.value.map(item => {
    item.value = ''
    return item
  })
}

const onAddClick = async () => {
  // const serviceName = serversInputs.value.find(
  //   el => el.name === 'service'
  // ).value

  // const url = serversInputs.value.find(el => el.name === 'Link').value

  // const numberOfReviews = +serversInputs.value.find(
  //   el => el.name === 'Reviews count'
  // ).value

  // const rating = +serversInputs.value.find(el => el.name === 'Rating').value

  // await createServer(props.brokerId, url, rating, numberOfReviews, serviceName)

  resetInputs()

  emit('created')
  emit('close')
}

const handleCreateModalClose = () => {
  emit('close')
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Create new server"
    @close="handleCreateModalClose"
  >
    <div class="create-server__modal-content">
      <div
        v-for="(input, index) in serversInputs"
        :key="index"
        class="create-server__input-item"
      >
        <InputSelect
          v-slot="{ renderedItems }"
          v-if="input.type === 'select'"
          :id="input.id"
          :name="input.name"
          :options="['0042', '0043', '0044']"
          :title="input.title"
          :placeholder="input.placeholder"
          :value="input.value"
          @select="onSelectChange"
        >
          <InputSelectOption
            v-for="(option, idx) in renderedItems"
            :key="option"
            :index="idx"
            :option="option"
          />
        </InputSelect>
        <InputField
          v-else
          :id="input.id"
          :key="index"
          :required="input.required"
          :name="input.name"
          :type="input.type"
          :title="input.title"
          :placeholder="input.placeholder"
          :value="input.value.toString()"
          @input-value="onInputChange"
        />
      </div>
    </div>
    <div class="create-server__buttons">
      <TheButton
        tag="button"
        variant="close"
        button-size="medium"
        @click="handleCreateModalClose"
      >
        Close
      </TheButton>
      <TheButton
        tag="button"
        variant="fill"
        button-size="medium"
        @click="onAddClick"
      >
        Create
      </TheButton>
    </div>
  </TheModal>
</template>
