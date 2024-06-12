<script setup lang="ts">
interface iProps {
  headerFields: string[]
  isSort?: boolean
}

defineProps<iProps>()

const onSort = (e, e2) => {
  console.log(e, e2)
}
</script>

<template>
  <div class="table-head">
    <TableRow>
      <TableCell
        v-for="(headerItem, idx) in headerFields"
        :key="idx"
        :item="headerItem"
        :class="`table-cell--${idx}`"
        :is-sort="true"
        @sort="onSort"
      />
    </TableRow>
  </div>
</template>
