<script setup lang="ts">
const navigationList = [
  {
    text: 'Account',
    link: '/settings/account',
  },
  {
    text: 'Calendar',
    link: '/settings/calendar',
  },
  {
    text: 'Schedule news',
    link: '/settings/schedule-news',
  },
  {
    text: 'Users',
    link: '/settings/users',
  },
  {
    text: 'Servers',
    link: '/settings/servers',
  },
]
</script>

<template>
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
                <NuxtLink :to="item.link" class="settings__nav-link">
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
</template>
