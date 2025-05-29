<script setup lang="ts">
const balanceList = ref([
  {
    title: 'Profit',
    balances: [
      { currency: 'EUR', value: 3.75, percent: '+5' },
      { currency: 'GBP', value: 2.95, percent: '-10' },
      { currency: 'AUD', value: 6.12, percent: '+8' },
      { currency: 'CAD', value: 5.5, percent: '+12' },
      { currency: 'JPY', value: 1.8, percent: '-15' },
      { currency: 'CHF', value: 4.6, percent: '-6' },
    ],
  },
  {
    title: 'Current balance',
    balances: [
      { currency: 'EUR', value: 3.75, percent: '+5' },
      { currency: 'GBP', value: 2.95, percent: '-10' },
      { currency: 'AUD', value: 6.12, percent: '+8' },
      { currency: 'CAD', value: 5.5, percent: '+12' },
      { currency: 'JPY', value: 1.8, percent: '-15' },
      { currency: 'CHF', value: 4.6, percent: '-6' },
    ],
  },
])
</script>

<template>
  <div class="balance-list">
    <TradingTraderBalanceItem
      v-for="(item, idx) in balanceList"
      :key="idx"
      :title="item?.title"
      :balances="item?.balances"
    />
  </div>
</template>
