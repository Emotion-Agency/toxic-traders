<script setup lang="ts">
const platformsList = [
  {
    platform: 'Fix Api',
  },
  {
    platform: 'cTrader',
  },
  {
    platform: 'NinjaTrader',
  },
  {
    platform: 'Webplatform',
  },
]
</script>

<template>
  <div class="platforms">
    <TheAccordion class="platforms__accordion" title="Platforms">
      <TheBadge
        v-for="(item, idx) in platformsList"
        :key="idx"
        variant="fill"
        :is-button="true"
        >{{ item.platform }}</TheBadge
      >
    </TheAccordion>
  </div>
</template>
