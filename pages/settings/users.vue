<script lang="ts" setup>
import { keysGenerator } from '@emotionagency/utils'
import type { iCreatedUser } from '~/types/settings/users'

const newUserModalOpened = ref(false)

const emit = defineEmits(['sort'])

const searchInput = reactive({
  required: false,
  id: 'settings-users-search',
  name: 'Settings search',
  type: 'text',
  value: '',
  placeholder: 'Search users',
  disabled: false,
  isRightButton: true,
})

const onChange = (inputData: iInputData) => {
  searchInput.value = inputData.value
  const searchValue = inputData.value.toLowerCase()

  if (searchValue === '') {
    return
  }
}

const createUserModalClose = () => {
  newUserModalOpened.value = false
  document.body.classList.remove('modal-open')
}

const createUserModalOpen = () => {
  newUserModalOpened.value = true
  document.body.classList.add('modal-open')
}

const isLoading = ref(false)

const { createUser, users, fetchUser, user } = useUsers()

const onCreateUser = async (data: iCreatedUser) => {
  try {
    isLoading.value = true

    const res = await createUser({
      email: data.email,
      password: `${keysGenerator(12)}*`,
      role: data.level.toLowerCase(),
      allowDBAccess: data.access,
    })

    await fetchUser(user.value.id)
    createUserModalClose()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const searchedUsers = computed(() => {
  if (searchInput.value === '') {
    return users.value
  }

  return users.value.filter(user => {
    return (
      user.userName.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
    )
  })
})
</script>

<template>
  <div class="settings-users">
    <div class="settings-users__top-bar">
      <InputField
        :id="searchInput.id"
        :required="searchInput.required"
        :name="searchInput.name"
        :type="searchInput.type"
        :placeholder="searchInput.placeholder"
        :disabled="searchInput.disabled"
        :is-right-button="searchInput.isRightButton"
        class="settings-users__search-input"
        @input-value="onChange"
      >
        <template #right-icon>
          <IconsSearch />
        </template>
      </InputField>
      <TheButton
        class="settings-users__btn"
        tag="button"
        variant="fill"
        button-size="medium"
        type="button"
        @click="createUserModalOpen"
      >
        <template #start-icon>
          <IconsPlus />
        </template>
        <span>Create new</span>
      </TheButton>
    </div>
    <div class="settings-users__table-wrapper">
      <UsersTable v-if="searchedUsers?.length" :accounts="searchedUsers" />
      <NotFound v-else />
    </div>
    <NewUserModal
      :modal-opened="newUserModalOpened"
      @close="createUserModalClose"
      @create="onCreateUser"
    />
  </div>
</template>
