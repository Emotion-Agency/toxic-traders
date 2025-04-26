<script lang="ts" setup>
import type { iInput } from '~/types'
import type { iClient } from '~/types/settings/users'

interface iProps {
  modalOpened: boolean
  servers: iClient[]
}

defineProps<iProps>()

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
])

const { createClient } = await useClients()

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

const onAddClick = async () => {
  await createClient({
    clientName: serversInputs.value.find(el => el.name === 'Name').value,
    ip: serversInputs.value.find(el => el.name === 'Address').value,
  })

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
        :disabled="serversInputs.some(input => !input.value)"
      >
        Create
      </TheButton>
    </div>
  </TheModal>
</template>
