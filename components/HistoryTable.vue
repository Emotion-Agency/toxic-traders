<script setup lang="ts">
const headerFields = ['ID', 'Message', 'Timestamp', 'Level', 'BrokerId']
</script>

<template>
  <ClientOnly>
    <div class="table">
      <div class="table__wrapper">
        <TableHead :header-fields="headerFields" />
        <TableBody>
          <!-- <TableRow v-for="(broker, idx) in brokers" :key="idx">
            <TableCell
              v-for="(item, id, index) in broker"
              :key="id"
              :item="item"
              :class="`table-cell--${index}`"
              :link="
                broker.companyNames === item
                  ? {
                      url: `/brokers/${broker.companyNames}`,
                      text: broker.companyNames,
                    }
                  : null
              "
            />
          </TableRow> -->
        </TableBody>
      </div>
    </div>
  </ClientOnly>
</template>
