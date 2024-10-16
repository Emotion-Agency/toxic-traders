<script lang="ts" setup>
interface iProps {
  isOpen: boolean
}

defineProps<iProps>()

const { logout } = useAuth()

const onSettings = () => {}
const onLogout = () => {
  logout()
}
</script>

<template>
  <div
    class="settings-dropdown"
    :class="[isOpen && 'settings-dropdown--visible']"
  >
    <div class="settings-dropdown__window">
      <ul class="settings-dropdown__items">
        <li class="settings-dropdown__item">
          <button class="settings-dropdown__btn" @click="onSettings">
            <IconsSettings class="settings-dropdown__icon" />
            <span>Account Settings</span>
          </button>
        </li>
        <li class="settings-dropdown__item settings-dropdown__item--red">
          <button class="settings-dropdown__btn" @click="onLogout">
            <IconsLogout class="settings-dropdown__icon" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
