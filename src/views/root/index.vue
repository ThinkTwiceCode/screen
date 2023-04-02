<template>
  <div class="page-container page-root">
    <div class="card-grid">
      <CardBarrage />
      <CardDraw />
      <CardQRCode />
      <CardInDevelopment />
    </div>
  </div>
</template>

<script setup lang="ts">
import CardBarrage from '@/components/page-card/barrage.vue';
import CardDraw from '@/components/page-card/draw.vue';
import CardQRCode from '@/components/page-card/qrcode.vue';
import CardInDevelopment from '@/components/page-card/in-development.vue';

import { useWaterRipple } from '@/uses/use-click-animate';

useWaterRipple('page-card');
</script>
<script lang="ts">
export default { name: 'PageRoot' };
</script>

<style scoped lang="less">
.card-grid {
  display: flex;
  flex-wrap: wrap;

  > * {
    width: calc((100% - var(--am-padding-m)) / 2);

    &:nth-child(2n) {
      margin-left: var(--am-margin-m);
    }

    &:nth-child(2) ~ * {
      margin-top: var(--am-margin-m);
    }
  }
}
</style>
