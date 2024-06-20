<script setup lang="ts"></script>

<template>
  <div class="type-of-account-table">
    <Table>
      <TableHead>
        <TableRow>
          <!-- <TableCell
            v-for="(headerItem, idx) in headerFields"
            :key="idx"
            :item="headerItem"
            :class="`table-cell--${idx}`"
            :is-sort="true"
            :sort-order="sortState.sortOrder"
            :is-active="sortState.sortBy === headerItem"
            @sort="onSort"
          /> -->
        </TableRow>
      </TableHead>
      <TableBody>
        <!-- <TableRow v-for="(item, idx) in filteredServersList" :key="idx">
          <TableCell
            v-for="(cell, i) in item"
            :key="i"
            :item="cell?.serverName || 'N/A'"
            :class="`table-cell--${i}`"
            :is-modal="!!cell?.serverName"
            @open="serversModalOpen(idx)"
          />
        </TableRow> -->
      </TableBody>
    </Table>
  </div>
</template>
