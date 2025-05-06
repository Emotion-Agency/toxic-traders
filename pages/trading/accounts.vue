<script setup lang="ts"></script>

<template>
  <main class="container">
    <section class="hero-accounts">
      <div class="hero-accounts__wrapper">
        <h1 class="hero-accounts__title">Accounts</h1>
        <div class="hero-accounts__btns">
          <TheButton tag="button" class="hero-accounts__btn">
            <template #start-icon>
              <IconsPlus />
            </template>
            Add account
          </TheButton>
          <TheButton tag="button" variant="outlined" class="hero-accounts__btn">
            <template #start-icon>
              <IconsSuccess />
            </template>
            Check accounts
          </TheButton>
          <TheButton
            tag="button"
            variant="outlined"
            class="hero-accounts__btn"
            disabled
          >
            <template #start-icon>
              <IconsPlus />
            </template>
            Add investor account
          </TheButton>
        </div>
      </div>
    </section>
    <section class="acc-content">
      <div class="acc-content__wrapper"></div>
    </section>
  </main>
</template>
