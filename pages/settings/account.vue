<script lang="ts" setup>
const isLoading = ref(false)

const oPasswordInput = ref({
  title: 'Old password',
  required: true,
  id: 'settings-old-password',
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

const nPasswordInput = ref({
  title: 'Password',
  required: true,
  id: 'settings-new-password',
  name: 'Old password',
  type: 'password',
  value: '',
  error: true,
  validators: [
    Validation.required('Password is required'),
    Validation.min(6, 'Password must be at least 6 characters'),
  ],
  placeholder: 'Your password',
  isRightButton: true,
})

const cnPasswordInput = ref({
  title: 'Confirm new password',
  required: true,
  id: 'settings-confirm-password',
  name: 'Compared password',
  type: 'password',
  value: '',
  error: true,
  validators: [
    Validation.required('Password is required'),
    Validation.isEqual(nPasswordInput.value.value, 'Passwords must match'),
  ],
  placeholder: 'Your password',
  isRightButton: true,
})

watch(nPasswordInput, () => {
  cnPasswordInput.value = {
    ...cnPasswordInput.value,
    validators: [
      Validation.required('Password is required'),
      Validation.isEqual(nPasswordInput.value.value, 'Passwords must match'),
    ],
  }
})

const handleSubmit = () => {
  console.log('submitted')
}

const onChange = (e: iInputData) => {
  if (oPasswordInput.value.id === e.id) {
    oPasswordInput.value = {
      ...oPasswordInput.value,
      value: e.value,
      error: e.error,
    }
  }

  if (nPasswordInput.value.id === e.id) {
    nPasswordInput.value = {
      ...nPasswordInput.value,
      value: e.value,
      error: e.error,
    }
  }

  if (cnPasswordInput.value.id === e.id) {
    cnPasswordInput.value = {
      ...cnPasswordInput.value,
      value: e.value,
      error: e.error,
    }
  }
}
</script>

<template>
  <div class="settings-account">
    <h2 class="settings-account__title">Change password</h2>
    <form
      class="settings-account__form"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <legend class="settings-account__form-title">Write new password</legend>
      <ul class="settings-account__items-list">
        <li class="settings-account__item">
          <InputPassword
            :title="oPasswordInput?.title"
            :id="oPasswordInput?.id"
            :required="oPasswordInput?.required"
            :name="oPasswordInput?.name"
            :type="oPasswordInput?.type"
            :placeholder="oPasswordInput?.placeholder"
            :is-right-button="oPasswordInput?.isRightButton"
            :value="oPasswordInput?.value"
            :validators="oPasswordInput?.validators"
            @input-value="onChange"
          />
        </li>
        <li class="settings-account__item">
          <InputPassword
            :title="nPasswordInput?.title"
            :id="nPasswordInput?.id"
            :required="nPasswordInput?.required"
            :name="nPasswordInput?.name"
            :type="nPasswordInput?.type"
            :placeholder="nPasswordInput?.placeholder"
            :is-right-button="nPasswordInput?.isRightButton"
            :value="nPasswordInput?.value"
            :validators="nPasswordInput?.validators"
            @input-value="onChange"
          />
        </li>
        <li class="settings-account__item">
          <InputPassword
            :title="cnPasswordInput?.title"
            :id="cnPasswordInput?.id"
            :required="cnPasswordInput?.required"
            :name="cnPasswordInput?.name"
            :type="cnPasswordInput?.type"
            :placeholder="cnPasswordInput?.placeholder"
            :is-right-button="cnPasswordInput?.isRightButton"
            :value="cnPasswordInput?.value"
            :validators="cnPasswordInput?.validators"
            @input-value="onChange"
          />
        </li>
      </ul>
      <button class="settings-account__forgot-btn">Forgot password?</button>
      <TheButton
        class="settings-account__btn"
        tag="button"
        variant="fill"
        button-size="large"
        type="submit"
      >
        <Spinner v-if="isLoading" />
        <span v-else>Update</span>
      </TheButton>
    </form>
    <div class="settings-account__delete">
      <h2 class="settings-account__title">Delete account</h2>
      <p class="settings-account__text">
        Permanently remove your Personal Account and all of its contents from
        the Toxic Traders platform. This action is not reversible, so please
        continue with caution.
      </p>
      <TheButton
        class="settings-account__delete-btn"
        tag="button"
        variant="danger"
        button-size="large"
        type="button"
      >
        <span>Delete Account</span>
      </TheButton>
    </div>
  </div>
</template>
