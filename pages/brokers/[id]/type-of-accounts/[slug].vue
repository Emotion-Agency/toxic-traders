<script setup lang="ts">
import type { iInput } from '~/types'
import type { iBrokerServerAccount } from '~/types/broker/brokerServer'

const route = useRoute()

const { getCurrentBrokerServer } = useBrokerServer()

const notesValue = ref('')
const notesInput = ref({
  required: false,
  id: 'type-of-account-notes',
  name: 'Notes',
  type: 'textarea',
  value: notesValue,
  placeholder: 'Add your notes...',
})
const isSettingsOpened = ref(false)
const isOrderIdListOpened = ref(false)
const serverType = ref<number>(null)

const [serverId, accountId] = (route.params.slug as string).split('-')
const currentAccount = ref<iBrokerServerAccount>(null)
const {
  getBrokerAccountNotes,
  updateBrokerAccountNotes,
  deleteBrokerAccountNotes,
} = useBrokerServerAccountNotes()

const notesOnChange = (val: iInput) => {
  notesValue.value = val?.value
}

const onBlur = async () => {
  if (notesValue.value?.length === 0) {
    await deleteBrokerAccountNotes(+accountId)
    return
  }

  await updateBrokerAccountNotes(+accountId, notesValue.value)
}

const openSettings = () => {
  isSettingsOpened.value = true
  document.body.classList.add('modal-open')
}

const closeSettings = () => {
  isSettingsOpened.value = false
}

const openOrderIdList = () => {
  isOrderIdListOpened.value = true
  document.body.classList.add('modal-open')
}

const closeOrderIdList = () => {
  isOrderIdListOpened.value = false
}

const changeTableColumns = (properties: string[]) => {
  console.log(properties)
}

onMounted(async () => {
  const { brokerServers } = await getCurrentBrokerServer(+serverId)
  const notesRequestValue = await getBrokerAccountNotes(+accountId)

  notesValue.value = notesRequestValue || ''

  currentAccount.value = brokerServers
    .map(server => server.brokerServerAccounts)
    .flat()
    .find(account => account.id === +accountId)

  serverType.value = brokerServers[0]?.serverType
})
</script>

<template>
  <main>
    <section class="type-of-account">
      <div class="container type-of-account__wrapper">
        <div class="grid type-of-account__top-block">
          <div class="type-of-account__info">
            <ul class="type-of-account__info-list">
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">Leverage:</p>
                <p class="type-of-account__info-text">
                  {{ currentAccount?.brokerLeverage || 'N/A' }}
                </p>
              </li>
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">Timezome:</p>
                <p class="type-of-account__info-text">
                  {{ getGMTOffset(currentAccount?.brokerServerTimeZone) }}
                </p>
              </li>
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">OrderId Digits:</p>
                <p class="type-of-account__info-text">8</p>
              </li>
            </ul>
            <TheButton
              tag="button"
              button-size="medium"
              variant="fill"
              class="type-of-account__info-btn"
              @click="openOrderIdList"
            >
              <template #start-icon>
                <IconsList />
              </template>
              Order Id List
            </TheButton>
          </div>
          <div class="type-of-account__notes">
            <p class="type-of-account__notes-title">Notes</p>
            <TheInput
              :id="notesInput?.id"
              :required="notesInput?.required"
              :name="notesInput?.name"
              :type="notesInput?.type"
              :placeholder="notesInput?.placeholder"
              :value="notesInput?.value"
              class="type-of-account__notes-input"
              @input-value="notesOnChange"
              @input-blur="onBlur"
            />
          </div>
          <div class="type-of-account__server">
            <h1 class="type-of-account__title">
              {{ currentAccount?.accountType || 'N/A' }}
            </h1>
            <TheButton
              tag="button"
              button-size="medium"
              variant="fill"
              class="type-of-account__settings-btn"
              @click="openSettings"
            >
              <template #start-icon>
                <IconsSettings />
              </template>
              Settings
            </TheButton>
          </div>
        </div>
        <div class="type-of-account__bottom-block">
          <BrokerTypeOfAccountsTable
            :account-id="+accountId"
            :server-type="serverType"
          />
        </div>
      </div>
    </section>
    <TheModal
      :modal-opened="isSettingsOpened"
      title="Choose needed properties"
      class-name="brokers__modal"
      @close="closeSettings"
    >
      <TheSettings
        :properties="['property1', 'property2', 'property3']"
        @change="changeTableColumns"
      />
    </TheModal>
    <SlidingModal
      :modal-opened="isOrderIdListOpened"
      title="OrderId List"
      @close="closeOrderIdList"
    >
      <BrokerOrderListTable
        :account-orders="currentAccount?.brokerServerAccountOrders || []"
      />
    </SlidingModal>
  </main>
</template>
