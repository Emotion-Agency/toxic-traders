<script setup lang="ts"></script>

<template>
  <main>
    <section>
      <div class="container">
        <h1 class="22">Hello from Emotion!</h1>
        <TheButton :button-size="'medium'" :variant="'soft'">Button</TheButton>
        <TheBadge :variant="'fill'" :is-button="true">Badge</TheBadge>
      </div>
    </section>
  </main>
</template>
