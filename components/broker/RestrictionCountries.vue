<script setup lang="ts">
const countriesList = [
  {
    countryCode: 'Russia',
  },
  {
    countryCode: 'Syria',
  },
  {
    countryCode: 'Iran',
  },
  {
    countryCode: 'North Korea',
  },
  {
    countryCode: 'Estonia',
  },
  {
    countryCode: 'GB',
  },
]
</script>

<template>
  <div class="restriction-countries">
    <TheAccordion
      class="restriction-countries__accordion"
      title="Restriction Countries"
    >
      <TheBadge
        v-for="(item, idx) in countriesList"
        :key="idx"
        variant="outlined"
        :is-button="true"
        >{{ item.countryCode }}</TheBadge
      >
    </TheAccordion>
  </div>
</template>
