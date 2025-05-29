<script setup lang="ts">
interface IProps {
  title?: string
  balances?: {
    currency: string
    value: number
    percent: string
  }[]
}

defineProps<IProps>()
</script>

<template>
  <div class="balance-item">
    <h2 class="balance-item__title">{{ title }}</h2>
    <ul v-if="title.toLowerCase() === 'profit'" class="balance-item__head-list">
      <li class="balance-item__head-item">
        <p>Cur</p>
      </li>
      <li class="balance-item__head-item">
        <p>Value</p>
      </li>
      <li class="balance-item__head-item">
        <p>%</p>
      </li>
    </ul>

    <ul class="balance-item__list">
      <li
        v-for="(item, idx) in balances"
        :key="idx"
        class="balance-item__list-item"
      >
        <p class="balance-item__currency">{{ item.currency }}</p>
        <p class="balance-item__value">{{ item.value.toFixed(2) }}</p>
        <p
          class="balance-item__percent"
          :class="{
            'balance-item__percent--positive': item.percent.startsWith('+'),
            'balance-item__percent--negative': item.percent.startsWith('-'),
          }"
        >
          {{ item.percent }}%
        </p>
      </li>
    </ul>
  </div>
</template>
