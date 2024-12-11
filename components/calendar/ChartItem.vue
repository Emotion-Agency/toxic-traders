<script lang="ts" setup>
interface IProps {
  title: string
  number: {
    number: string | number | undefined
    variant?: 'positive' | 'negative' | 'neutral'
    unit?: string
    scale?: string
  }
}

defineProps<IProps>()
</script>

<template>
  <div class="calendar__chart-item">
    <h2 class="calendar__chart-item-title">{{ title }}</h2>
    <CalendarTableNumber
      class="calendar__chart-item-text"
      :number="number.number"
      :variant="number.variant"
      :unit="number.unit"
      :scale="number.scale"
    />
  </div>
</template>
