<script setup lang="ts"></script>

<template>
  <li class="release-item">
    <h3 class="release-item__title">event 10</h3>
    <div class="release-item__content">
      <p class="release-item__text">
        <span class="release-item__flag">
          <IconsYEFlag />
          <!-- <img
          v-if="getCountryFlag(event.country)?.url"
          class="sci__flag"
          :src="getCountryFlag(event.country)?.url"
          :alt="getCountryFlag(event.country).alt"
        /> -->
        </span>
        <span class="release-item__country">YE</span>
        <span class="release-item__name">DE Saxony CPI MoM</span>
      </p>
    </div>
    <div class="release-item__info">
      <p class="release-item__date">24.02.2024</p>
      <p class="release-item__time">15:30:00</p>
    </div>
  </li>
</template>
