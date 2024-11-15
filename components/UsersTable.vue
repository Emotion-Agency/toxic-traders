<script setup lang="ts">
import type { iUser } from '~/types/settings/users'
import { forgotPasswordRequest } from '~/utils/api/auth/reset'
import { deleteUserRequest } from '~/utils/api/auth/user'

interface iProps {
  accounts: iUser[]
}

defineProps<iProps>()

const emit = defineEmits(['sort'])

const isLoading = ref(false)

const deleteModalOpened = ref(false)
const resetModalOpened = ref(false)

const selectedUser = ref<iUser | null>(null)

const { toast } = useToasts()

const { fetchUser, user } = useUsers()

const headerFields = [
  'Full name',
  'Email',
  'Level',
  'Access to Brokers',
  'Actions',
]

const { sortState, onSort } = useSort(
  {
    sortBy: 'ID',
  },
  () => emit('sort', sortState.value)
)

const onDeleteBtnClick = (user: iUser) => {
  selectedUser.value = user
  deleteModalOpened.value = true
}

const onResetPassBtnClick = (user: iUser) => {
  selectedUser.value = user
  resetModalOpened.value = true
}

const changeAccess = (value: boolean) => {
  console.log(value)
}

const onDelete = async () => {
  if (selectedUser.value === null) return
  try {
    isLoading.value = true
    await deleteUserRequest(selectedUser.value.email)
    await fetchUser(user.value.id)
    deleteModalClose()
    toast.success('User deleted')
  } catch (error) {
    toast.error('Failed to delete user')
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const onResetPass = async () => {
  if (selectedUser.value === null) return
  try {
    isLoading.value = true
    await forgotPasswordRequest(selectedUser.value.email)
    resetModalClose()
    toast.success('Password reset link sent to user')
  } catch (error) {
    toast.error('Failed to reset password')
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const deleteModalClose = () => {
  deleteModalOpened.value = false
  selectedUser.value = null
}

const resetModalClose = () => {
  resetModalOpened.value = false
  selectedUser.value = null
}
</script>

<template>
  <Table class="users-table">
    <TableHead>
      <TableRow>
        <TableCell
          v-for="(headerItem, idx) in headerFields"
          :key="idx"
          :item="headerItem"
          :class="`table-cell--${toDashCase(headerItem)}`"
          :is-sort="true"
          :sort-order="sortState.sortOrder"
          :is-active="sortState.sortBy === headerItem"
          @sort="onSort"
        >
          {{ headerItem }}
        </TableCell>
      </TableRow>
    </TableHead>
    <TableHead :header-fields="headerFields" />
    <TableBody>
      <TableRow v-for="(user, idx) in accounts" :key="idx">
        <TableCell :item="user.userName" :class="`table-cell--full-name`">{{
          user.userName
        }}</TableCell>
        <TableCell :item="user.email" :class="`table-cell--email`">{{
          user.email
        }}</TableCell>
        <TableCell
          item="level"
          :class="`table-cell--level`"
          :disable-tooltip="true"
        >
          <TheBadge variant="outlined" text="level" />
        </TableCell>
        <TableCell
          item="access"
          :disable-tooltip="true"
          :class="`table-cell--access-to-brokers`"
        >
          <InputCheckbox
            name="Access to Brokers"
            value=""
            :id="`access-${user.id}`"
            @input-value="changeAccess"
          />
        </TableCell>
        <TableCell
          item="actions"
          :disable-tooltip="true"
          :class="`table-cell--actions`"
        >
          <div class="users-table__buttons-wrapper">
            <TheButton
              variant="warning"
              button-size="small"
              @click="onResetPassBtnClick(user)"
            >
              Reset Pass
            </TheButton>
            <TheButton
              variant="danger"
              button-size="small"
              @click="onDeleteBtnClick(user)"
            >
              Delete
            </TheButton>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <DeleteModal
    :modal-opened="deleteModalOpened"
    text="Are you sure you want to delete this account? This action cannot be prevented"
    @close="deleteModalClose"
    @delete="onDelete"
    :is-loading="isLoading"
  />
  <TheModal
    class-name="reset-modal"
    :modal-opened="resetModalOpened"
    title="Reset the password"
    @close="resetModalClose"
  >
    <p class="reset-modal__text" style="margin-top: 20px">
      We will send a link to reset this user password via email
    </p>

    <div class="reset-modal__btn-wrapper">
      <TheButton
        class="reset-modal__btn"
        tag="button"
        variant="close"
        button-size="medium"
        @click="resetModalClose"
      >
        Cancel
      </TheButton>
      <TheButton
        class="reset-modal__btn"
        tag="button"
        variant="fill"
        button-size="medium"
        @click="onResetPass"
      >
        <Spinner v-if="isLoading" />
        <span v-else> Reset </span>
      </TheButton>
    </div>
  </TheModal>
</template>
