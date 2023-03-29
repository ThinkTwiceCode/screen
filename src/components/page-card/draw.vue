<template>
  <BaseCard
    :to="{ name: $routerName.Draw }"
    :icon="Icon"
    :title="$t('draw.title')"
    :description="$t('draw.slogan')"
  />
</template>

<script setup lang="ts">
import BaseCard from './index.vue';

import Icon from '@/assets/icon-svg/draw.svg';
</script>
<script lang="ts">
export default { name: 'CardDraw' };
</script>
