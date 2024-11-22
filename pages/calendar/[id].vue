<script lang="ts" setup>
const route = useRoute()

const { id } = route.params

const { country, title } = route.query
</script>

<template>
  <section class="calendar">
    <div class="container calendar__wrapper">
      <h1 class="calendar__title">{{ title }} {{ country }}</h1>
    </div>
  </section>
</template>
