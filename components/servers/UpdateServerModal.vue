<script lang="ts" setup>
import type { iInput } from '~/types'
import type { IClient } from '~/types/clients/clients'

interface iProps {
  modalOpened: boolean
  servers: IClient[]
  selectedServer?: IClient | null
}

const props = defineProps<iProps>()

const emit = defineEmits(['close', 'updated'])

const { updateClient } = await useClients()

const createInputs = (server?: IClient | null) => [
  {
    id: 'update-server-name',
    title: 'Name',
    name: 'Name',
    type: 'text',
    value: server?.clientName || '',
    placeholder: 'Server name',
  },
  {
    id: 'update-server-address',
    title: 'IP',
    name: 'Address',
    type: 'text',
    value: server?.ip || '',
    placeholder: '42.42.42.42',
  },
]

const serversInputs = ref(createInputs(props.selectedServer))

watch(
  () => props.selectedServer,
  server => {
    serversInputs.value = createInputs(server)
  }
)

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
    id: props.selectedServer?.id,
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
