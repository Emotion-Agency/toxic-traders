<script setup lang="ts">
interface iProps {
  brokerId: number
}

defineProps<iProps>()

const statisticOptions = ref({
  placeholder: 'Placeholder',
  options: [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
  ],
})

const getSelectedItem = item => {
  console.log(item)
}
</script>

<template>
  <div class="statistics">
    <CustomSelect
      :options="statisticOptions.options"
      :placeholder="statisticOptions.placeholder"
      class="statistics__select"
      @select="getSelectedItem"
    />
    <div class="statistics__table">
      <BrokerStatisticsTable />
    </div>
  </div>
</template>
