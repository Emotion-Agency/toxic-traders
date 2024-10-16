<script setup lang="ts">
const isPassword = ref(false)
const inputsData = ref([
  {
    title: 'Email',
    required: true,
    id: 'auth-email',
    name: 'Email',
    type: 'text',
    value: '',
    validation: 'email',
    validationText: 'Please enter a valid email',
    placeholder: 'Your email',
  },
  {
    title: 'Password',
    required: true,
    id: 'auth-password',
    name: 'Password',
    type: 'password',
    value: '',

    placeholder: 'Your password',
    isRightButton: true,
  },
])

const { login } = useAuth()

const router = useRouter()

const handleSubmit = async () => {
  const email = inputsData.value[0].value
  const password = inputsData.value[1].value

  if (!email || !password) {
    return
  }

  await login(email, password)
  router.push('/')
}

const onChange = (e: iInputData) => {
  inputsData.value = inputsData.value.map(input => {
    if (input.id === e.id) {
      return { ...input, value: e.value, error: e.error }
    }
    return input
  })
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
                :title="input?.title"
                :required="input?.required"
                :name="input?.name"
                :type="input?.type"
                :placeholder="input?.placeholder"
                :is-right-button="!!input?.isRightButton"
                :value="input?.value"
                :validation="input?.validation"
                :validation-text="input?.validationText"
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
