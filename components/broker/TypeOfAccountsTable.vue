<script setup lang="ts">
import type {
  iBrokerServerAccountSymbolsMT4,
  iBrokerServerAccountSymbolsMT5,
} from '~/types/broker/brokerServerAccountSymbols'

interface iProps {
  accountId: number
  serverType: number | null
}

const props = defineProps<iProps>()

const { getServerAccountSymbolsMT4, getServerAccountSymbolsMT5 } =
  useBrokerServerAccountSymbols()
const headerFields = ref<string[]>([])

const serverAccountSymbols = ref<
  iBrokerServerAccountSymbolsMT4[] | iBrokerServerAccountSymbolsMT5[]
>([])

watch(
  () => props.serverType,
  async () => {
    if (props.serverType === 0) {
      serverAccountSymbols.value = await getServerAccountSymbolsMT4(
        props.accountId
      )
    }

    if (props.serverType === 1) {
      serverAccountSymbols.value = await getServerAccountSymbolsMT5(
        props.accountId
      )
    }

    headerFields.value = Object.keys(serverAccountSymbols.value[0])
  }
)

onMounted(async () => {})
</script>

<template>
  <div class="type-of-account-table">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in headerFields"
            :key="idx"
            :item="formatNameToNormalCase(headerItem)"
            :class="`table-cell--${idx}`"
            :is-sort="true"
          />
        </TableRow>
      </TableHead>
      <TableBody>
        <!-- <TableRow v-for="(item, idx) in filteredServersList" :key="idx">
          <TableCell
            v-for="(cell, i) in item"
            :key="i"
            :item="cell?.serverName || 'N/A'"
            :class="`table-cell--${i}`"
            :is-modal="!!cell?.serverName"
            @open="serversModalOpen(idx)"
          />
        </TableRow> -->
      </TableBody>
    </Table>
  </div>
</template>
