<template>
  <div class="the-layout">
    <TheHeader class="the-header" />

    <main class="the-main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import TheHeader from './header.vue';
</script>
<script lang="ts">
export default { name: 'TheLayout' };
</script>

<style scoped lang="less">
.the-layout {
  min-height: 100vh;
}
</style>