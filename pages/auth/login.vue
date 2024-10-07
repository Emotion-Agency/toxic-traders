<script setup lang="ts">
const isPassword = ref(false)
const inputsData = [
  {
    required: true,
    id: 'auth-email',
    name: 'Email',
    type: 'text',
    value: '',
    placeholder: 'Email',
  },
  {
    required: true,
    id: 'auth-password',
    name: 'Password',
    type: 'password',
    value: '',
    placeholder: 'Password',
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
    <div class="login">
      <div class="login__wrapper container">
        <NuxtLink to="/" class="login__logo-wrapper">
          <span>
            <IconsLogo />
          </span>
        </NuxtLink>
        <form @submit.prevent="handleSubmit" class="login__form">
          <h1 class="login__title">Log In</h1>
          <ul class="login__items-list">
            <li
              v-for="(input, idx) in inputsData"
              :key="idx"
              class="login__item"
            >
              <TheInput
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
          <NuxtLink to="/auth/password-reset" class="login__forgot-pass-link">
            Forgot password?
          </NuxtLink>
          <TheButton
            class="login__login-btn"
            tag="button"
            variant="fill"
            button-size="large"
            type="submit"
          >
            Log In
          </TheButton>
        </form>

        <TheSupport />
      </div>
    </div>
  </main>
</template>
