<template>
  <div class="the-header">
    <div class="title-wrap">
      <h2 class="title">{{ $t('app.title') }}</h2>
      <h3 class="subtitle" @click="showSubtitle()">{{ $t('app.subtitleDetails.variant') }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n/index';

function showSubtitle() {
  alert(t('app.subtitleDetails.original'));
}
</script>
<script lang="ts">
export default { name: 'TheHeader' };
</script>

<style scoped lang="less">
.the-header {
  display: flex;
  align-items: center;
  height: var(--am-header-height);
  padding: var(--am-padding-s);
  background: var(--am-primary-color);

  .title-wrap {
    color: #fff;

    .title {
      font-size: 16px;  
      font-weight: 600;
    }

    .subtitle {
      font-size: 12px;
      font-weight: 300;
    }
  }
}
</style>