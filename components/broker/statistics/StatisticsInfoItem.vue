<script setup lang="ts">
import type { iLink } from '~/types'

interface iProps {
  title: string
  link?: iLink
  text1?: string
  text2?: string | iLink
}

defineProps<iProps>()
</script>

<template>
  <div class="statistics-item">
    <h4 class="statistics-item__title">
      {{ title }}
    </h4>
    <a
      v-if="link"
      :href="link?.url"
      class="statistics-item__text statistics-item__text--link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ link?.text }}
    </a>
    <p v-if="text1" class="statistics-item__text">
      {{ text1 }}
    </p>
    <p v-if="text2" class="statistics-item__text">
      {{ text2 }}
    </p>
  </div>
</template>
