<script setup lang="ts">
const isPassword = ref(false)
const inputsData = [
  {
    title: 'Password',
    required: true,
    id: 'new-password',
    name: 'Password',
    type: 'password',
    value: '',
    placeholder: 'Your password',
    isRightButton: true,
  },
  {
    title: 'Password to compare',
    required: true,
    id: 'compared-password',
    name: 'Compared password',
    type: 'password',
    value: '',
    placeholder: 'Your password',
    isRightButton: true,
  },
]

const handleSubmit = () => {
  console.log('submitted')
}

const onChange = (e: iInputData) => {
  console.log(e)
}

const showPassword = () => {
  isPassword.value = !isPassword.value
}
</script>

<template>
  <main>
    <div class="password-new">
      <div class="password-new__wrapper container">
        <NuxtLink to="/" class="password-new__logo-wrapper">
          <span>
            <IconsLogo />
          </span>
        </NuxtLink>
        <form @submit.prevent="handleSubmit" class="password-new__form">
          <h1 class="password-new__title">Write new password</h1>
          <ul class="password-new__items-list">
            <li
              v-for="(input, idx) in inputsData"
              :key="idx"
              class="password-new__item"
            >
              <TheInput
                :title="input?.title"
                :id="input?.id"
                :required="input?.required"
                :name="input?.name"
                :type="input?.type"
                :placeholder="input?.placeholder"
                :is-right-button="input?.isRightButton"
                :value="input?.value"
                @input-value="onChange"
                @right-click="showPassword"
              >
                <template #right-icon>
                  <IconsPasswordEye :is-visible="isPassword" />
                </template>
              </TheInput>
            </li>
          </ul>
          <TheButton
            class="password-new__btn"
            tag="nuxt-link"
            to="/"
            variant="fill"
            button-size="large"
            type="submit"
          >
            Update
          </TheButton>
        </form>

        <TheSupport />
      </div>
    </div>
  </main>
</template>
