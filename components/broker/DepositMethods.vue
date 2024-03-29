<script setup lang="ts">
const methodsList = [
  {
    depositMethod: 'Bank transfer',
  },
  {
    depositMethod: 'Skrill',
  },
  {
    depositMethod: 'Crypto',
  },
  {
    depositMethod: 'BTC',
  },
  {
    depositMethod: 'PayPal',
  },
]
</script>

<template>
  <div class="deposit-methods">
    <TheAccordion class="deposit-methods__accordion" title="Method of deposit">
      <TheBadge
        v-for="(item, idx) in methodsList"
        :key="idx"
        variant="fill"
        :is-button="true"
        >{{ item.depositMethod }}</TheBadge
      >
    </TheAccordion>
  </div>
</template>
