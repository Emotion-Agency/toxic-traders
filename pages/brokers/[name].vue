<script lang="ts" setup>
const route = useRoute()
const name = route.params.name
</script>

<template>
  <div>{{ name }}</div>
</template>
