<script setup lang="ts">
import type { iUser } from '~/types/settings/users'

interface iProps {
  accounts: iUser[]
}

defineProps<iProps>()

const emit = defineEmits(['sort'])

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

const changeAccess = (value: boolean) => {
  console.log(value)
}

const onResetPass = () => {}

const onDelete = () => {}
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
              @click="onResetPass"
            >
              Reset Pass
            </TheButton>
            <TheButton variant="danger" button-size="small" @click="onDelete">
              Delete
            </TheButton>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
