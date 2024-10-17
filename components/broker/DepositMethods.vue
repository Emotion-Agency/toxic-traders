<script setup lang="ts">
import type { iInputMultiselect } from '~/types'
import { getBrokerDepositMethodsList } from '~/utils/api/brokers/brokerDepositMethodsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const depositList = ref<{ id: number; text: string }[]>([])
const selectedDepositList = ref<number[]>([])
const depositNames = ref<string[]>([])
const filteredDepositList = computed(() => {
  return depositList.value
    ?.filter(deposit => selectedDepositList.value?.includes(+deposit.id))
    .map(item => ({
      text: item?.text,
      id: +item?.id,
    }))
})

const { createDepositMethods, getDepositMethods, updateDepositMethods } =
  useBrokerDepositMethods()

const getDepositList = async () => {
  const { depositMethods } = await getDepositMethods(props.brokerId)

  selectedDepositList.value =
    depositMethods?.map(item => item?.depositMethod) || []
}

const selectDeposit = async (deposit: string) => {
  const currentDeposit = depositList.value?.find(item => item.text === deposit)

  selectedDepositList.value = [
    ...selectedDepositList.value,
    +currentDeposit?.id,
  ]

  await createDepositMethods(props.brokerId, selectedDepositList.value)
  await getDepositList()
}

const removeDeposit = async (item: iInputMultiselect) => {
  selectedDepositList.value = selectedDepositList.value.filter(
    depositId => depositId !== item?.id
  )

  await updateDepositMethods(props.brokerId, selectedDepositList.value)
  await getDepositList()
}

onMounted(async () => {
  const depositMethodsListRequest = await getBrokerDepositMethodsList()

  depositList.value = Object.keys(depositMethodsListRequest).map(key => ({
    id: Number(key),
    text: removeUnderlines(depositMethodsListRequest[key]),
  }))

  depositNames.value = depositList.value.map(deposit => deposit?.text)

  await getDepositList()
})
</script>

<template>
  <div class="deposit-methods">
    <TheAccordion class="deposit-methods__accordion" title="Method of deposit">
      <InputMultiselect
        id="deposit-methods"
        :dropdown-list="depositNames"
        :badges-list="filteredDepositList"
        badge-variant="fill"
        @select="selectDeposit"
        @remove="removeDeposit"
      />
    </TheAccordion>
  </div>
</template>
