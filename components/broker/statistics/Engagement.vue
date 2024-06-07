<script setup lang="ts"></script>

<template>
  <div class="statistics-content engagement">
    <h3 class="statistics-title engagement__title">Traffic & Engagement</h3>
    <ul class="statistics-list engagement__info">
      <li
        class="statistics-items engagement__info-column statistics-items--uniq"
      >
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
      </li>
      <li
        class="statistics-items engagement__info-column statistics-items--uniq"
      >
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
        <BrokerStatisticsInfoItem
          title="hello world"
          text1="hello world 2"
          text2="hello world 2"
        />
      </li>
      <li class="statistics-items engagement__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
      </li>
      <li class="statistics-items engagement__info-column">
        <BrokerStatisticsInfoItem title="hello world" text1="hello world 2" />
      </li>
    </ul>
  </div>
</template>
