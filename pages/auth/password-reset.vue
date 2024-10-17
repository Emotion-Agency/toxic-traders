<script setup lang="ts">
import { forgotPasswordRequest } from '~/utils/api/auth/reset'

const emailInput = ref({
  title: 'Email',
  required: true,
  id: 'reset-email',
  name: 'Email',
  type: 'text',
  value: '',
  error: true,
  placeholder: 'Your email',
  validators: [
    Validation.required('Email is required'),
    Validation.email('Please enter a valid email address'),
  ],
})

const isLoading = ref(false)

const { addToast } = useToasts()

const handleSubmit = async () => {
  const email = emailInput.value.value
  if (!email) {
    return
  }

  if (emailInput.value.error) {
    return
  }

  try {
    isLoading.value = true
    await forgotPasswordRequest(email)
    addToast({
      color: ToastColor.success,
      text: 'We have sent you an email with a link to reset your password.',
    })
  } catch (error) {
    console.log(error)
    addToast({
      color: ToastColor.danger,
      text: 'Something went wrong. Please try again later.',
    })
  } finally {
    isLoading.value = false
  }
}

const onChange = (e: iInputData) => {
  emailInput.value = { ...emailInput.value, ...e }
}
</script>

<template>
  <main>
    <div class="password-reset">
      <div class="password-reset__wrapper container">
        <NuxtLink to="/" class="password-reset__logo-wrapper">
          <span>
            <IconsLogo />
          </span>
        </NuxtLink>
        <form @submit.prevent="handleSubmit" class="password-reset__form">
          <h1 class="password-reset__title">Reset the password</h1>
          <p class="password-reset__description">
            We will send you a link to reset your password via email.
          </p>
          <ul class="password-reset__items-list">
            <li class="password-reset__item">
              <InputField
                class="password-reset__input"
                :title="emailInput?.title"
                :id="emailInput?.id"
                :required="emailInput?.required"
                :name="emailInput?.name"
                :type="emailInput?.type"
                :placeholder="emailInput?.placeholder"
                :value="emailInput?.value"
                :validators="emailInput?.validators"
                @input-value="onChange"
              />
            </li>
          </ul>
          <div class="password-reset__btn-wrapper">
            <TheButton
              class="password-reset__btn"
              variant="fill"
              button-size="large"
              type="submit"
            >
              <Spinner v-if="isLoading" />
              <span v-else>Reset</span>
            </TheButton>
            <TheButton
              class="password-reset__btn"
              tag="nuxt-link"
              to="/auth/login"
              variant="close"
              button-size="large"
            >
              Cancel
            </TheButton>
          </div>
        </form>

        <TheSupport />
      </div>
    </div>
  </main>
</template>
