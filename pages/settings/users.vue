<script lang="ts" setup>
const newUserModalOpened = ref(false)
const headerFields = ['ID', 'Message', 'Timestamp', 'Level']
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

const newUserModalClose = () => {
  newUserModalOpened.value = false
  document.body.classList.remove('modal-open')
}

const newUserModalOpen = () => {
  newUserModalOpened.value = true
  document.body.classList.add('modal-open')
}

const { sortState, onSort } = useSort(
  {
    sortBy: 'ID',
  },
  () => emit('sort', sortState.value)
)
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
        @click="newUserModalOpen"
      >
        <template #start-icon>
          <IconsPlus />
        </template>
        <span>Create new</span>
      </TheButton>
    </div>
    <div class="settings-users__table-wrapper">
      <!-- <UsersTable /> -->
    </div>
  </div>
</template>
