<script setup lang="ts">
import { getBrokerDepositMethodsList } from '~/api/brokers/brokerDepositMethodsList'

interface iProps {
  brokerId: number
}

const props = defineProps<iProps>()

const depositFullList = ref<string[]>([])
const depositList = ref<number[]>([])
const filteredDepositList = computed(() => {
  return removeUnderlines(
    depositList.value?.map(index => depositFullList.value[index]) || []
  )
})

const { createDepositMethods, getDepositMethods, updateDepositMethods } =
  useBrokerDepositMethods()

const selectDeposit = async (deposit: string) => {
  const depositIndex = depositFullList.value.findIndex(el => el === deposit)

  depositList.value.push(depositIndex)
  await createDepositMethods(props.brokerId, depositList.value)
}

const removeDeposit = async (index: number) => {
  depositList.value.splice(index, 1)
  await updateDepositMethods(props.brokerId, depositList.value)
}

onMounted(async () => {
  const depositMethodsListRequest = await getBrokerDepositMethodsList()
  const depositData = await getDepositMethods(props.brokerId)

  depositFullList.value = removeUnderlines(
    Object.values(depositMethodsListRequest)
  )
  depositList.value =
    depositData?.depositMethods?.map(item => item.depositMethod) || []
})
</script>

<template>
  <div class="deposit-methods">
    <TheAccordion class="deposit-methods__accordion" title="Method of deposit">
      <TagsInput
        :dropdown-list="depositFullList"
        :badges-list="filteredDepositList"
        badge-variant="fill"
        @select="selectDeposit"
        @remove="removeDeposit"
      />
    </TheAccordion>
  </div>
</template>
