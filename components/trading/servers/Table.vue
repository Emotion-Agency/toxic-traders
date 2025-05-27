<script lang="ts" setup>
import Table from '~/components/Table.vue'
import type { IClient } from '~/types/clients/clients'

interface IProps {
  servers: IClient[]
  defaultSortBy?: string
  defaultSortOrder?: 1 | 2
}

const props = defineProps<IProps>()

const emit = defineEmits(['sort', 'delete', 'update'])

const headings = ['status', 'clientName', 'ip', 'actions']

const formattedHeadingFields = computed(() =>
  headings.map(h => formatNameToNormalCase(h))
)

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

const serverStatus = (status?: string) => {
  if (!status) return 'Offline'

  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus === 'disconnected') return 'Offline'
  if (normalizedStatus === 'connected') return 'Online'

  return 'Offline'
}
</script>

<template>
  <div>
    <Table class="trading-trading-servers-table">
      <TableHead>
        <TableRow>
          <TableCell
            v-for="(headerItem, idx) in formattedHeadingFields"
            :key="idx"
            :item="headerItem"
            :is-sort="isSortable(headerItem)"
            :sort-order="sortState.sortOrder"
            :is-active="
              sortState.sortBy?.toLowerCase() === headerItem?.toLowerCase() ||
              sortState.sortBy?.toLowerCase() ===
                headings[idx]?.toLowerCase() ||
              sortState.sortBy?.toLowerCase() ===
                formattedHeadingFields[idx]?.toLowerCase()
            "
            class="trading-servers-table__cell"
            :class="[`trading-servers-table__cell--${toDashCase(headerItem)}`]"
            :disable-tooltip="true"
            @sort="onSort"
          >
            {{ headerItem }}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow v-for="server in servers" :key="server.id" :id="server.id">
          <TableCell
            :item="server.status"
            class="trading-servers-table__cell"
            :class="[`trading-servers-table__cell--status`]"
            :disable-tooltip="true"
          >
            <div
              class="trading-servers-table__status"
              :class="`trading-servers-table__status--${serverStatus(server.status).toLowerCase()}`"
            >
              <span />
              <p class="trading-servers-table__status-text">
                {{ serverStatus(server.status) }}
              </p>
            </div>
          </TableCell>
          <TableCell
            :item="server.clientName"
            class="trading-servers-table__cell"
            :class="[`trading-servers-table__cell--name`]"
          >
            {{ server.clientName || 'N/A' }}
          </TableCell>
          <TableCell
            :item="server.ip"
            class="trading-servers-table__cell"
            :class="[`trading-servers-table__cell--address`]"
          >
            {{ server.ip || 'N/A' }}
          </TableCell>
          <TableCell
            class="trading-servers-table__cell"
            :class="[`trading-servers-table__cell--actions`]"
            :disable-tooltip="true"
          >
            <div class="trading-servers-table__actions">
              <button
                type="button"
                class="trading-servers-table__actions-btn"
                @click="emit('update', server.id)"
              >
                <IconsPencilSquare />
              </button>
              <button
                type="button"
                class="trading-servers-table__actions-btn"
                @click="emit('delete', server.id)"
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
