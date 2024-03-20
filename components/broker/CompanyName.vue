<script setup lang="ts">
interface iProps {
  brokersHeadings: string[]
}

defineProps<iProps>()
</script>

<template>
  <div class="company-name">
    <TheAccordion title="Company Name">
      <p v-for="(title, idx) in brokersHeadings" :key="idx">
        {{ formatNameToNormalCase(title) }}
      </p>
    </TheAccordion>
  </div>
</template>
