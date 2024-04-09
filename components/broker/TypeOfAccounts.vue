<script setup lang="ts">
const accountList = ref([
  {
    title: 'MT4 Standrart',
  },
  {
    title: 'MT4 ECN',
  },
  {
    title: 'MT4 ECN',
  },
  {
    title: 'MT4 ECN',
  },
  {
    title: 'MT4 ECN',
  },
])

const addNewAccountType = () => {}

const openAccountMenu = () => {}
</script>

<template>
  <div class="type-accounts">
    <ul class="type-accounts__list">
      <BrokerTypeOfAccountsItem
        title="Add new"
        :is-new-account="true"
        @add-new-account="addNewAccountType"
      />
      <BrokerTypeOfAccountsItem
        v-for="(account, idx) in accountList"
        :id="idx"
        :key="idx"
        :title="account.title"
        class="type-accounts__item"
        @click="openAccountMenu()"
      />
    </ul>
  </div>
</template>
