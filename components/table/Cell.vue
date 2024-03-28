<script setup lang="ts">
interface iProps {
  item: string | number | null
  link?: {
    text: string
    url: string
  }
  isSort?: boolean
}

withDefaults(defineProps<iProps>(), {
  link: null,
})

const emit = defineEmits(['sort'])
</script>

<template>
  <div class="table-cell">
    <NuxtLink
      v-if="link && link?.text?.length"
      :to="link!.url"
      class="table-cell__link"
    >
      <span> {{ link!.text }} </span>
      <IconsLinkArrow />
    </NuxtLink>
    <button v-else-if="isSort" class="table-cell__btn" @click="emit('sort')">
      {{ item }}
      <IconsDownUpArrow />
    </button>
    <p v-else class="table-cell__text">
      {{ item }}
    </p>
  </div>
</template>
