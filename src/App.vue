<template>
  <TheLayout>
    <RouterView #default="{ Component }">
      <Transition name="scale" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </TheLayout>
</template>

<script setup lang="ts">
import TheLayout from '@/components/the-layout/index.vue';
</script>