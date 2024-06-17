<script setup lang="ts">
import type { iInput } from '~/types'

const route = useRoute()
console.log(route.params.slug)
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

const notesOnChange = (val: iInput) => {
  notesValue.value = val?.value
}

const onBlur = () => {
  'Blur notes'
}

onMounted(async () => {
  const { brokerServers } = await getCurrentBrokerServer(
    Number(route.params.slug) // 5741
  )

  // brokerServers[0].brokerServerAccounts.filter(
  //   item => item.id === +route.params.slug
  // )
  console.log(brokerServers)
  // currentAccount.value = accounts.value.filter(item => console.log(item))

  // console.log(currentAccount.value)
})
</script>

<template>
  <main>
    <section class="type-of-account">
      <div class="container type-of-account__wrapper">
        <div class="grid type-of-account__top-block">
          <div class="type-of-account__server-info">
            <ul class="type-of-account__info-list">
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">Leverage:</p>
                <p class="type-of-account__info-text">1:500</p>
              </li>
              <li class="type-of-account__info-item">
                <p class="type-of-account__info-title">Timezome:</p>
                <p class="type-of-account__info-text">GMT+2</p>
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
            <h1 class="type-of-account__title">Alpari MT4 Standart</h1>
            <TheButton
              tag="button"
              button-size="medium"
              variant="fill"
              class="type-of-account__settings-btn"
            >
              <template #start-icon>
                <IconsSettings />
              </template>
              Settings
            </TheButton>
          </div>
        </div>
        <div class="type-of-account__bottom-block"></div>
      </div>
    </section>
  </main>
</template>
