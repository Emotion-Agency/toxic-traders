<script setup lang="ts">
interface iProps {
  headerFields: string[]
  isSort?: boolean
}

defineProps<iProps>()
</script>

<template>
  <thead>
    <tr>
      <th v-for="(headerItem, idx) in headerFields" :key="idx">
        {{ headerItem }}
      </th>
    </tr>
  </thead>
</template>
