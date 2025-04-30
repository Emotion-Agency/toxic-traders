<script setup lang="ts">
interface iNavigationSubItem {
  id: string
  text: string
  link: string
}

interface iNavigationItem {
  id: string
  text: string
  link?: string
  menu?: iNavigationSubItem[]
}

const openMenuStates = ref<Record<string, boolean>>({})

const navigationList = ref<iNavigationItem[]>([
  {
    id: 'calendar',
    text: 'Calendar',
    link: '/calendar/',
  },
  {
    id: 'brokers',
    text: 'Brokers',
    link: '/brokers/',
  },
  {
    id: 'news-trader',
    text: 'News Trader',
    menu: [
      {
        id: 'servers',
        text: 'Servers',
        link: '/servers/',
      },
    ],
  },
  {
    id: 'spreads',
    text: 'Spreads',
    link: '/spreads/',
  },
])
</script>

<template>
  <nav class="navigation">
    <template v-for="(item, idx) in navigationList" :key="idx">
      <DropdownMenuRoot
        v-if="item.id === 'news-trader'"
        v-model:open="openMenuStates[item.text]"
        :modal="false"
      >
        <DropdownMenuTrigger
          type="button"
          class="navigation__link"
          :class="{ active: openMenuStates[item.text] }"
        >
          {{ item.text }}
          <IconsChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent class="navigation__dropdown-content">
            <DropdownMenuItem
              v-for="(menuItem, index) in item.menu"
              :key="index"
            >
              <NuxtLink :to="menuItem.link" class="navigation__link">
                {{ menuItem.text }}
              </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>

      <NuxtLink v-else :to="item.link" class="navigation__link">
        {{ item.text }}
      </NuxtLink>
    </template>
  </nav>
</template>
