<script lang="ts" setup>
interface iProps {
  isOpen: boolean
}

defineProps<iProps>()

const isLogoutModalOpened = ref(false)

const onLogout = () => {
  isLogoutModalOpened.value = true
}

const $el = ref<HTMLElement | null>(null)

defineExpose({
  $el,
})
</script>

<template>
  <div
    ref="$el"
    class="settings-dropdown"
    :class="[isOpen && 'settings-dropdown--visible']"
    aria-menu="true"
  >
    <div class="settings-dropdown__window">
      <ul class="settings-dropdown__items">
        <li class="settings-dropdown__item">
          <NuxtLink class="settings-dropdown__btn" to="/settings/">
            <IconsSettings class="settings-dropdown__icon" />
            <span>Account Settings</span>
          </NuxtLink>
        </li>
        <li class="settings-dropdown__item settings-dropdown__item--red">
          <button class="settings-dropdown__btn" @click="onLogout">
            <IconsLogout class="settings-dropdown__icon" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
    <LogoutModal
      :modalOpened="isLogoutModalOpened"
      title="Logout"
      @close="() => (isLogoutModalOpened = false)"
    />
  </div>
</template>
