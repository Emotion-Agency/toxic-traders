<script setup lang="ts">
const { userJWT } = useAuth()

const navigationList = ref([
  { text: 'Account', link: '/settings/account' },
  { text: 'Calendar', link: '/settings/calendar' },
  { text: 'Schedule news', link: '/settings/schedule-news', disabled: true },
  { text: 'Users', link: '/settings/users' },
  { text: 'Servers', link: '/settings/servers', disabled: true },
])

onMounted(() => {
  const role = userJWT.value?.role || 'investor'
  const canViewUsers = ['admin', 'trader'].includes(role)

  navigationList.value = navigationList.value.filter(item => {
    if (item.text === 'Users') return canViewUsers

    return true
  })
})
</script>

<template>
  <div>
    <NuxtLayout name="default">
      <main>
        <div
          class="container settings"
          style="padding-top: 120px; padding-bottom: 120px; min-height: 100vh"
        >
          <h1 class="settings__title">Settings</h1>
          <div class="settings__divider" />
          <div class="settings__wrapper">
            <nav class="settings__nav">
              <ul class="settings__nav-list">
                <li
                  v-for="(item, idx) in navigationList"
                  :key="idx"
                  class="settings__nav-item"
                >
                  <NuxtLink
                    :to="item.link"
                    :disabled="item.disabled"
                    class="settings__nav-link"
                  >
                    {{ item.text }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
            <div class="settings__content-wrapper">
              <slot />
            </div>
          </div>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>
