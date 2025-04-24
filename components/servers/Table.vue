<script lang="ts" setup>
import Table from '../Table.vue'
import type { iServersData } from '~/pages/servers.vue'

interface IProps {
  serversData: iServersData[]
  defaultSortBy?: string
  defaultSortOrder?: 1 | 2
}

const props = defineProps<IProps>()

const emit = defineEmits(['sort', 'delete', 'update'])

const headings = ['Status', 'Name', 'IP Address', 'Actions']

const formattedHeadingFields = computed(() => {
  return headings.map(field => formatNameToNormalCase(field))
})

const { sortState, onSort } = useSort(
  {
    sortBy: props.defaultSortBy,
    sortOrder: props.defaultSortOrder,
  },
  () => {
    emit('sort', {
      ...sortState.value,
    })
  }
)

const notSortableFields = ['Actions']

const isSortable = (field: string) => {
  return !notSortableFields.includes(field)
}
</script>

<template>
  <div>
    <Table class="servers-table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="headerItem in formattedHeadingFields"
            :key="headerItem"
            :item="headerItem"
            :is-sort="isSortable(headerItem)"
            :sort-order="sortState.sortOrder"
            :is-active="sortState.sortBy === headerItem"
            class="servers-table__cell"
            :class="[`servers-table__cell--${toDashCase(headerItem)}`]"
            :disable-tooltip="true"
            @sort="onSort"
          >
            {{ headerItem }}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="item in serversData" :key="item.id" :id="item.id">
          <TableCell
            :item="item.status"
            class="servers-table__cell"
            :class="[`servers-table__cell--status`]"
            :disable-tooltip="true"
          >
            <div
              class="servers-table__status"
              :class="`servers-table__status--${item.status}`"
            >
              <span />
              <p class="servers-table__status-text">
                {{ formatNameToNormalCase(item.status) }}
              </p>
            </div>
          </TableCell>
          <TableCell
            :item="item.name"
            class="servers-table__cell"
            :class="[`servers-table__cell--name`]"
          >
            {{ item.name }}
          </TableCell>
          <TableCell
            :item="item.address"
            class="servers-table__cell"
            :class="[`servers-table__cell--address`]"
          >
            {{ item.address }}
          </TableCell>
          <TableCell
            :item="item.address"
            class="servers-table__cell"
            :class="[`servers-table__cell--actions`]"
            :disable-tooltip="true"
          >
            <div class="servers-table__actions">
              <button
                type="button"
                class="servers-table__actions-btn"
                @click="emit('update', item.id)"
              >
                <IconsPencilSquare />
              </button>
              <button
                type="button"
                class="servers-table__actions-btn"
                @click="emit('delete', item.id)"
              >
                <IconsX />
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
