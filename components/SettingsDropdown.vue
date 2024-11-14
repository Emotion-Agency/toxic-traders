<script lang="ts" setup>
const isLogoutModalOpened = ref(false)

const onLogout = () => {
  isLogoutModalOpened.value = true
}

const { user } = useAuth()
</script>

<template>
  <HeadlessDropdownMenu class="dropdown settings-dropdown">
    <HeadlessDropdownTrigger class="header__account">
      <span class="header__account-name">{{ user?.email }}</span>
      <img
        src="/images/avatars/1.jpg"
        alt="Avatar"
        class="header__account-img"
      />
    </HeadlessDropdownTrigger>

    <Teleport to="#teleports">
      <Transition name="dropdown">
        <HeadlessDropdownItems
          position-x="right"
          position-y="top"
          style="z-index: 1000"
          class="dropdown__items settings-dropdown__items"
        >
          <HeadlessDropdownItem class="dropdown__item settings-dropdown__item"
            ><NuxtLink class="settings-dropdown__btn" to="/settings/">
              <IconsSettings class="settings-dropdown__icon" />
              <span>Account Settings</span>
            </NuxtLink>
          </HeadlessDropdownItem>
          <HeadlessDropdownItem
            class="dropdown__item settings-dropdown__item settings-dropdown__item--red"
          >
            <button class="settings-dropdown__btn" @click="onLogout">
              <IconsLogout class="settings-dropdown__icon" />
              <span>Logout</span>
            </button>
          </HeadlessDropdownItem>
        </HeadlessDropdownItems>
      </Transition>
    </Teleport>
  </HeadlessDropdownMenu>

  <LogoutModal
    :modalOpened="isLogoutModalOpened"
    title="Logout"
    @close="() => (isLogoutModalOpened = false)"
  />
</template>
