<script setup lang="ts">
const { getStatisticProviders } = useBrokerStatistic()

const headerFields = ref([])

onMounted(async () => {
  const { providerNames } = await getStatisticProviders()

  headerFields.value = providerNames

  console.log(headerFields.value)
})
</script>

<template>
  <div class="statistics-table">
    <Table>
      <TableHead :header-fields="headerFields" />
      <!-- <TableBody>
        <TableRow v-for="(item, idx) in filteredServersList" :key="idx">
          <TableCell
            v-for="(cell, i) in item"
            :key="i"
            :item="cell?.serverName || 'N/A'"
            :class="`table-cell--${i}`"
            :is-modal="!!cell?.serverName"
            @open="serversModalOpen(idx)"
          />
          <TheModal
            :modal-opened="isOpenedServersModal[idx]"
            title="Server info"
            @close="serversModalClose(idx)"
          >
            <ProviderStatistic opened/>
          </TheModal>
        </TableRow>
      </TableBody> -->
    </Table>
  </div>
</template>
