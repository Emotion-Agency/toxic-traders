<script setup lang="ts">
import { resetPasswordRequest } from '~/utils/api/auth/reset'

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

const isLoading = ref(false)
const router = useRouter()
const { toast } = useToasts()

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
    toast.success('Password has been successfully changed.')

    router.push('/auth/login')
  } catch (error) {
    toast.error('Something went wrong. Please try again later.')

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
              <InputPassword
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
              />
            </li>
            <li class="password-new__item">
              <InputPassword
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
              />
            </li>
          </ul>
          <TheButton
            class="password-new__btn"
            variant="fill"
            button-size="large"
            type="submit"
          >
            <Spinner v-if="isLoading" />
            <span v-else>Update</span>
          </TheButton>
        </form>

        <TheSupport />
      </div>
    </div>
  </main>
</template>
