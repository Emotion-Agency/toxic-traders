<script lang="ts" setup>
interface IProps {
  transitionName?: string
}

withDefaults(defineProps<IProps>(), {
  transitionName: 'fade',
})

const $el = ref<HTMLElement | null>(null)

const dialogId = inject('dialogId') as string

const registerWindow = inject('registerWindow') as (el: HTMLElement) => void

onMounted(() => {
  // @ts-ignore
  registerWindow($el)
})
</script>

<template>
  <Transition :name="transitionName">
    <div
      ref="$el"
      :id="dialogId"
      tabindex="-1"
      role="document"
      data-dialog-window
      v-bind="$attrs"
    >
      <slot />
    </div>
  </Transition>
</template>
