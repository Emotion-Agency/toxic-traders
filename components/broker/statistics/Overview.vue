<script setup lang="ts"></script>

<template>
  <div class="statistics-content overview">
    <h3 class="statistics-title overview__title">Overview</h3>
    <ul class="statistics-list overview__info">
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem
          title="hello world"
          :link="{ url: '#', text: 'hello world 1' }"
        />
      </li>
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 1" />
      </li>
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 1" />
      </li>
      <li class="statistics-items overview__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 1" />
      </li>
    </ul>
  </div>
</template>
