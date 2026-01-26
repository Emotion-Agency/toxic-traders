<script setup lang="ts">
import Loader from '~/components/headless/Loader.vue'

interface IProps {
  isChecking?: boolean
  title?: string
  addAccountDisabled?: boolean
  addInvestorDisabled?: boolean
}

withDefaults(defineProps<IProps>(), {
  isChecking: false,
  title: 'Accounts',
  addAccountDisabled: false,
  addInvestorDisabled: true,
})

const emit = defineEmits<{
  (e: 'create-account'): void
  (e: 'check-accounts'): void
  (e: 'add-investor'): void
}>()

const handleCreate = () => emit('create-account')
const handleCheck = () => emit('check-accounts')
const handleAddInvestor = () => emit('add-investor')
</script>

<template>
  <section class="hero-accounts">
    <div class="hero-accounts__wrapper">
      <h1 class="hero-accounts__title">{{ title }}</h1>

      <div class="hero-accounts__btns">
        <TheButton
          tag="button"
          class="hero-accounts__btn"
          :disabled="addAccountDisabled"
          @click="handleCreate"
        >
          <template #start-icon>
            <IconsPlus />
          </template>
          Add account
        </TheButton>

        <TheButton
          tag="button"
          variant="outlined"
          class="hero-accounts__btn"
          :disabled="isChecking"
          @click="handleCheck"
        >
          <template #start-icon>
            <Loader v-if="isChecking" />
            <IconsSuccess v-else />
          </template>
          Check accounts
        </TheButton>

        <TheButton
          tag="button"
          variant="outlined"
          class="hero-accounts__btn"
          :disabled="addInvestorDisabled"
          @click="handleAddInvestor"
        >
          <template #start-icon>
            <IconsPlus />
          </template>
          Add investor account
        </TheButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-accounts {
  padding-top: 142px;
  padding-bottom: 24px;
}

.hero-accounts__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-accounts__title {
  // @include heading-m-h1;
  max-width: 500px;
}

.hero-accounts__btns {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
