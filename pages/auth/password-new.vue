<script setup lang="ts">
import { resetPasswordRequest } from '~/utils/api/auth/reset'

const isPassword1 = ref(false)
const isPassword2 = ref(false)

const passwordInput = ref({
  title: 'Password',
  required: true,
  id: 'new-password',
  name: 'Password',
  type: 'password',
  value: '',
  error: true,
  placeholder: 'Your password',
  validators: [
    Validation.required('Password is required'),
    Validation.min(6, 'Password must be at least 6 characters'),
  ],
  isRightButton: true,
})

const cPasswordInput = ref({
  title: 'Password to compare',
  required: true,
  id: 'compared-password',
  name: 'Compared password',
  type: 'password',
  value: '',
  error: true,
  validators: [
    Validation.required('Password is required'),
    Validation.isEqual(passwordInput.value.value, 'Passwords must match'),
  ],
  placeholder: 'Your password',
  isRightButton: true,
})

watch(passwordInput, () => {
  cPasswordInput.value = {
    ...cPasswordInput.value,
    validators: [
      Validation.required('Password is required'),
      Validation.isEqual(passwordInput.value.value, 'Passwords must match'),
    ],
  }
})

const route = useRoute()

// ?token=CfDJ8Jn46ZI3MJRPu7jgggTbNnJOPD7QQhV8DkygVYQYzH3nBJogOkiiV6ErvCRN27lfuzOP5vyabwHr5ALzd4dNZ5UgVEotEQUMFLiITdQLo7FSGKJf6GWkYVasg0hnpb7%2FLJKNYi7ghqPYWWm2keHdaf%2FIxhSGTP%2BAuRfzAnsuWHvq%2Fsh6LVQsZEoMqR3vGBS5Sg%3D%3D&email=lkosteckiy5@gmail.com
const isLoading = ref(false)
const router = useRouter()
const { addToast } = useToasts()

const handleSubmit = async () => {
  const { token, email } = route.query

  const password = passwordInput.value.value
  const passwordC = cPasswordInput.value.value

  if (!passwordC || !password) {
    return
  }

  if (passwordInput.value.error || cPasswordInput.value.error) {
    return
  }

  try {
    isLoading.value = true
    await resetPasswordRequest(email as string, password, token as string)
    addToast({
      color: ToastColor.success,
      text: 'Password has been successfully changed.',
    })
    router.push('/auth/login')
  } catch (error) {
    addToast({
      color: ToastColor.danger,
      text: 'Something went wrong. Please try again later.',
    })
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const onChange = (e: iInputData) => {
  if (passwordInput.value.id === e.id) {
    passwordInput.value = {
      ...passwordInput.value,
      value: e.value,
      error: e.error,
    }
  }

  if (cPasswordInput.value.id === e.id) {
    cPasswordInput.value = {
      ...cPasswordInput.value,
      value: e.value,
      error: e.error,
    }
  }
}

const showPassword = (type: 1 | 2) => {
  if (type === 1) {
    isPassword1.value = !isPassword1.value
    return
  }

  isPassword2.value = !isPassword2.value
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
            <li class="password-new__item">
              <TheInput
                :title="passwordInput?.title"
                :id="passwordInput?.id"
                :required="passwordInput?.required"
                :name="passwordInput?.name"
                :type="passwordInput?.type"
                :placeholder="passwordInput?.placeholder"
                :is-right-button="passwordInput?.isRightButton"
                :value="passwordInput?.value"
                :validators="passwordInput?.validators"
                @input-value="onChange"
                @right-click="showPassword(1)"
              >
                <template #right-icon>
                  <IconsPasswordEye :is-visible="isPassword1" />
                </template>
              </TheInput>
            </li>
            <li class="password-new__item">
              <TheInput
                :title="cPasswordInput?.title"
                :id="cPasswordInput?.id"
                :required="cPasswordInput?.required"
                :name="cPasswordInput?.name"
                :type="cPasswordInput?.type"
                :placeholder="cPasswordInput?.placeholder"
                :is-right-button="cPasswordInput?.isRightButton"
                :value="cPasswordInput?.value"
                :validators="cPasswordInput?.validators"
                @input-value="onChange"
                @right-click="showPassword(2)"
              >
                <template #right-icon>
                  <IconsPasswordEye :is-visible="isPassword2" />
                </template>
              </TheInput>
            </li>
          </ul>
          <TheButton
            class="password-new__btn"
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
