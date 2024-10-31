<script lang="ts" setup>
import type { iInput, iSelectInput } from '~/types'

interface iProps {
  modalOpened: boolean
  text?: string
}

defineProps<iProps>()

const emit = defineEmits(['close', 'create'])

const { user } = useAuth()

const userRole = ref(null)

const nameInput = ref({
  title: 'Full name',
  required: true,
  id: 'users-name',
  name: 'Full name',
  type: 'text',
  error: true,
  value: '',
  validators: [
    Validation.required('Full name is required'),
    Validation.min(2, 'Full name must be at least 2 characters'),
  ],
  placeholder: 'John Doe',
})

const emailInput = ref({
  title: 'Email',
  required: true,
  id: 'users-email',
  name: 'Email',
  type: 'text',
  error: true,
  value: '',
  validators: [
    Validation.required('Email is required'),
    Validation.email('Please enter a valid email address'),
  ],
  placeholder: 'example@gmail.com',
})

const levelSelect = ref({
  id: 'users-level',
  title: 'Level',
  required: true,
  name: 'Levels',
  placeholder: 'Choose option',
  value: '',
  options: ['Trader', 'Investor'],
  error: true,
  validators: [Validation.required('Select the required option')],
  isReset: true,
})

const attachSelect = ref({
  id: 'users-attach',
  title: 'Attach to trader',
  required: true,
  name: 'Attach',
  placeholder: 'Choose option',
  value: '',
  options: ['Attach', 'To', 'Trader'],
  error: true,
  validators: [Validation.required('Select the required option')],
  isReset: true,
})

const accessCheckbox = ref({
  id: 'users-checkbox',
  value: 'Has access to brokers?',
  name: 'users-access',
  type: 'checkbox',
  disabled: false,
  checked: false,
  isRight: true,
})

const handleSubmit = () => {
  emit('create')
}

const onChange = (e: iInput) => {
  if (nameInput.value.id === e.id) {
    nameInput.value = {
      ...nameInput.value,
      value: e.value,
      error: e.error,
    }
  }

  if (emailInput.value.id === e.id) {
    emailInput.value = {
      ...emailInput.value,
      value: e.value,
      error: e.error,
    }
  }
}

const onSelect = (_: string, e: iSelectInput) => {
  if (levelSelect.value.id === e.id) {
    levelSelect.value = {
      ...levelSelect.value,
      value: e.value,
      error: false,
    }

    if (levelSelect.value.value === 'Investor') {
      attachSelect.value = {
        ...attachSelect.value,
        value: '',
        error: true,
      }
    } else if (levelSelect.value.value === 'Trader') {
      attachSelect.value = {
        ...attachSelect.value,
        value: '',
        error: false,
      }
    }
  }

  if (attachSelect.value.id === e.id) {
    attachSelect.value = {
      ...attachSelect.value,
      value: e.value,
      error: false,
    }
  }
}

const onReset = (_: string, e: iSelectInput) => {
  if (attachSelect.value.id === e.id) {
    attachSelect.value = {
      ...attachSelect.value,
      value: null,
      error: true,
    }
  }

  if (levelSelect.value.id === e.id) {
    levelSelect.value = {
      ...levelSelect.value,
      value: null,
      error: true,
    }
  }

  if (levelSelect.value.value !== 'Investor') {
    attachSelect.value = {
      ...attachSelect.value,
      value: '',
    }
  }
}

const onCheck = (_, checked: boolean) => {
  accessCheckbox.value = {
    ...accessCheckbox.value,
    checked,
  }
}

onMounted(() => {
  userRole.value = user.value?.role
})
</script>

<template>
  <TheModal
    :modal-opened="modalOpened"
    title="Create new user"
    @close="emit('close')"
  >
    <div class="user-modal">
      <form novalidate @submit.prevent="handleSubmit" class="user-modal__form">
        <div class="user-modal__list">
          <InputField
            :title="nameInput?.title"
            :id="nameInput?.id"
            :required="nameInput?.required"
            :name="nameInput?.name"
            :type="nameInput?.type"
            :placeholder="nameInput?.placeholder"
            :value="nameInput?.value"
            :validators="nameInput?.validators"
            class="user-modal__item"
            @input-value="onChange"
          />
          <InputField
            :title="emailInput?.title"
            :id="emailInput?.id"
            :required="emailInput?.required"
            :name="emailInput?.name"
            :type="emailInput?.type"
            :placeholder="emailInput?.placeholder"
            :value="emailInput?.value"
            :validators="emailInput?.validators"
            class="user-modal__item"
            @input-value="onChange"
          />
          <InputSelect
            v-if="userRole === 'admin'"
            :id="levelSelect?.id"
            :title="levelSelect?.title"
            :required="levelSelect?.required"
            :name="levelSelect?.name"
            :placeholder="levelSelect?.placeholder"
            :value="levelSelect?.value"
            :options="levelSelect?.options"
            :validators="levelSelect?.validators"
            :is-reset="levelSelect?.isReset"
            class="user-modal__item"
            @select="onSelect"
            @reset="onReset"
          />
          <InputSelect
            v-if="levelSelect.value === 'Investor'"
            :id="attachSelect?.id"
            :title="attachSelect?.title"
            :required="attachSelect?.required"
            :name="attachSelect?.name"
            :placeholder="attachSelect?.placeholder"
            :value="attachSelect?.value"
            :options="attachSelect?.options"
            :validators="attachSelect?.validators"
            :is-reset="attachSelect?.isReset"
            class="user-modal__item"
            @select="onSelect"
            @reset="onReset"
          />
          <InputCheckbox
            v-if="userRole === 'admin'"
            :id="accessCheckbox.id"
            :value="accessCheckbox.value"
            :name="accessCheckbox.name"
            :type="accessCheckbox.type"
            :checked="accessCheckbox.checked"
            :is-right="accessCheckbox.isRight"
            class="user-modal__item"
            @input-value="onCheck"
          />
        </div>

        <div class="user-modal__btn-wrapper">
          <TheButton
            class="user-modal__btn"
            tag="button"
            variant="close"
            button-size="medium"
            @click="emit('close')"
          >
            Close
          </TheButton>
          <TheButton
            class="user-modal__btn"
            tag="button"
            type="submit"
            variant="fill"
            button-size="medium"
            :disabled="
              !!nameInput?.error ||
              !!emailInput?.error ||
              !!attachSelect?.error ||
              !!levelSelect?.error
            "
            @click="emit('create')"
          >
            Create
          </TheButton>
        </div>
      </form>
    </div>
  </TheModal>
</template>
