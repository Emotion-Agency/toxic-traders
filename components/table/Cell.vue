<script setup lang="ts">
interface iProps {
  item: string | null
  link?: {
    text: string
    url: string
  }
}

withDefaults(defineProps<iProps>(), {
  link: null,
})
</script>

<template>
  <div class="table-cell">
    <NuxtLink v-if="link" :to="link!.url" class="table-cell__link">
      <span> {{ link!.text }} </span>
      <IconsLinkArrow />
    </NuxtLink>
    <p v-else class="table-cell__text">
      {{ item }}
    </p>
  </div>
</template>
