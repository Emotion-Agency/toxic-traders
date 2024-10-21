<script setup lang="ts">
import type { iBrokerServerAccountOrder } from '~/types/broker/brokerServerAccountOrders'

interface iProps {
  accountId: number
}

const props = defineProps<iProps>()

const accountOrders = ref<iBrokerServerAccountOrder[]>([])

const { getServerAccountOrders } = useBrokerServerAccountOrders()

const headerFields = computed(() => {
  return Object.keys(accountOrders.value[0] ?? {})
})

onMounted(async () => {
  accountOrders.value = await getServerAccountOrders(props.accountId)
})
</script>

<template>
  <div class="order-list-table">
    <Table v-if="accountOrders?.length" class="order-list-table__table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in headerFields"
            :key="idx"
            :item="formatNameToNormalCase(headerItem)"
            :class="`table-cell--${idx}`"
          >
            {{ formatNameToNormalCase(headerItem) }}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="(order, idx) in accountOrders" :key="idx">
          <TableCell
            v-for="(item, id, index) in order"
            :key="id"
            :item="
              id === 'openTime' ? formatDateWithTime(item.toString()) : item
            "
            :class="[`table-cell--${index}`]"
          >
            {{ id === 'openTime' ? formatDateWithTime(item.toString()) : item }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <p v-else class="order-list-table__error">Orders not found</p>
  </div>
</template>
