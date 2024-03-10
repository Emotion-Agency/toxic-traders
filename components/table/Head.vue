<script setup lang="ts">
interface iProps {
  headerFields: string[]
  isSort?: boolean
}

defineProps<iProps>()
</script>

<template>
  <div class="table-head">
    <TableRow>
      <TableCell
        v-for="(headerItem, idx) in headerFields"
        :key="idx"
        :item="headerItem"
      />
    </TableRow>
  </div>
</template>
