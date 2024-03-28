<script setup lang="ts">
interface iRegulationItem {
  name: string
  licenseNumber: number
  licenseLink?: string
}

const regulationItems = ref<iRegulationItem[]>([
  {
    name: 'FCA UK',
    licenseNumber: 316876,
    licenseLink: '/',
  },
  {
    name: 'ASIC',
    licenseNumber: 286365,
    licenseLink: '/',
  },
  {
    name: 'NFA',
    licenseNumber: 523426347,
  },
])
</script>

<template>
  <div class="regulation">
    <TheAccordion title="Regulation">
      <ul class="regulation__list">
        <li
          v-for="(item, idx) in regulationItems"
          :key="idx"
          class="regulation__item"
        >
          <p class="regulation__item-name">
            {{ item.name }}
          </p>
          <div class="regulation__content">
            <a
              v-if="item.licenseLink"
              :href="item.licenseLink"
              rel="noreferer noopener"
              target="_blank"
              class="regulation__link"
            >
              {{ item.licenseNumber }}
              <IconsLinkArrow />
            </a>
            <p v-else class="regulation__link regulation__link--text">
              {{ item.licenseNumber }}
            </p>
          </div>
        </li>
      </ul>
    </TheAccordion>
  </div>
</template>
