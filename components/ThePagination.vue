<script setup lang="ts"></script>

<template>
  <div class="pagination">
    <div class="container pagination__wrapper">
      <button class="prev pagination__btn">
        <span>
          <IconsNavigationArrow />
        </span>
        Previous
      </button>
      <div class="pagination__content"></div>
      <button class="next pagination__btn">
        Next
        <span>
          <IconsNavigationArrow />
        </span>
      </button>
    </div>
  </div>
</template>
