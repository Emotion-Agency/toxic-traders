<script setup lang="ts">
const inputsData = ref([
  {
    title: 'Email',
    required: true,
    id: 'auth-email',
    name: 'Email',
    type: 'text',
    error: true,
    value: '',
    validators: [
      Validation.required('Email is required'),
      Validation.email('Please enter a valid email address'),
    ],

    placeholder: 'Your email',
  },
  {
    title: 'Password',
    required: true,
    id: 'auth-password',
    name: 'Password',
    type: 'password',
    error: true,
    value: '',
    validators: [
      Validation.required('Password is required'),
      Validation.min(6, 'Password must be at least 6 characters'),
    ],
    placeholder: 'Your password',
    isRightButton: true,
  },
])

const { login } = useAuth()

const router = useRouter()

const isLoading = ref(false)

const { toast } = useToasts()

const handleSubmit = async () => {
  const email = inputsData.value[0].value
  const password = inputsData.value[1].value

  if (!email || !password) {
    return
  }

  if (inputsData.value.some(input => input.error)) {
    return
  }

  try {
    isLoading.value = true
    await login(email, password)
    router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onChange = (e: iInputData) => {
  inputsData.value = inputsData.value.map(input => {
    if (input.id === e.id) {
      return { ...input, value: e.value, error: e.error }
    }
    return input
  })
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
              <InputField
                v-if="input?.type !== 'password'"
                :id="input?.id"
                :title="input?.title"
                :required="input?.required"
                :name="input?.name"
                :type="input?.type"
                :placeholder="input?.placeholder"
                :is-right-button="!!input?.isRightButton"
                :value="input?.value"
                :validators="input?.validators"
                @input-value="onChange"
              />
              <InputPassword
                v-else
                :id="input?.id"
                :title="input?.title"
                :required="input?.required"
                :name="input?.name"
                :type="input?.type"
                :placeholder="input?.placeholder"
                :is-right-button="!!input?.isRightButton"
                :value="input?.value"
                :validators="input?.validators"
                @input-value="onChange"
              ></InputPassword>
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
            <Spinner v-if="isLoading" />
            <span v-else>Log In</span>
          </TheButton>
        </form>

        <TheSupport />
      </div>
    </div>
  </main>
</template>
