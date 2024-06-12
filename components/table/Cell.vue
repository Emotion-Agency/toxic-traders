<script setup lang="ts">
interface iProps {
  item: string | number | null
  link?: {
    text: string
    url: string
  }
  isSort?: boolean
  isModal?: boolean
}

const props = withDefaults(defineProps<iProps>(), {
  link: null,
})

const sortOrder = ref<1 | 2 | null>(null)
const emit = defineEmits(['sort', 'open'])

const onSort = () => {
  if (sortOrder.value === null) {
    sortOrder.value = 1
    return
  }

  if (sortOrder.value === 1) {
    sortOrder.value = 2
    return
  }

  if (sortOrder.value === 2) {
    sortOrder.value = null
  }
}

watch(sortOrder, () => {
  emit('sort', props.item, sortOrder.value)
})
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
    <button v-else-if="isSort" class="table-cell__btn" @click="onSort">
      {{ item }}
      <IconsDownArrow v-if="sortOrder === 1" />
      <IconsUpArrow v-else-if="sortOrder === 2" />
      <IconsDownUpArrow v-else />
    </button>
    <button
      v-else-if="isModal && item"
      class="table-cell__modal-btn"
      @click="emit('open')"
    >
      {{ item }}
      <IconsLinkArrow />
    </button>
    <p v-else class="table-cell__text">
      {{ item }}
    </p>
  </div>
</template>
