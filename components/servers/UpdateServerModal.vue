<script lang="ts" setup>
import type { iInput } from '~/types'
import type { IClient } from '~/types/clients/clients'

interface iProps {
  modalOpened: boolean
  servers: IClient[]
  serverId?: number
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'updated'])

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
])

const { updateClient } = await useClients()

const onInputChange = (e: iInput) => {
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

const onUpdateClick = async () => {
  await updateClient({
    id: props.serverId,
    clientName: serversInputs.value.find(el => el.name === 'Name').value,
    ip: serversInputs.value.find(el => el.name === 'Address').value,
  })

  resetInputs()

  emit('updated')
  emit('close')
}

const handleUpdateModalClose = () => {
  emit('close')
}
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Edit new server"
    @close="handleUpdateModalClose"
  >
    <div class="update-server__modal-content">
      <div
        v-for="(input, index) in serversInputs"
        :key="index"
        class="update-server__input-item"
      >
        <InputField
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
    <div class="update-server__buttons">
      <TheButton
        tag="button"
        variant="close"
        button-size="medium"
        @click="handleUpdateModalClose"
      >
        Close
      </TheButton>
      <TheButton
        tag="button"
        variant="fill"
        button-size="medium"
        @click="onUpdateClick"
      >
        Update
      </TheButton>
    </div>
  </TheModal>
</template>
