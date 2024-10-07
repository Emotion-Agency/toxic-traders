<script setup lang="ts">
const inputsData = [
  {
    title: 'Email',
    required: true,
    id: 'reset-email',
    name: 'Email',
    type: 'text',
    value: '',
    placeholder: 'Your email',
  },
]

const handleSubmit = () => {
  console.log('submitted')
}

const onChange = (e: iInputData) => {
  console.log(e)
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
            <li
              v-for="(input, idx) in inputsData"
              :key="idx"
              class="password-reset__item"
            >
              <h3 class="password-reset__input-title">{{ input.title }}</h3>
              <TheInput
                class="password-reset__input"
                :id="input?.id"
                :required="input?.required"
                :name="input?.name"
                :type="input?.type"
                :placeholder="input?.placeholder"
                :value="input?.value"
                @input-value="onChange"
              />
            </li>
          </ul>
          <div class="password-reset__btn-wrapper">
            <TheButton
              class="password-reset__btn"
              tag="nuxt-link"
              to="/"
              variant="fill"
              button-size="large"
              type="submit"
            >
              Reset
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
