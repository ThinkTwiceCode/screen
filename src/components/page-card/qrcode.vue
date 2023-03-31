<template>
  <BaseCard
    :to="{ name: $routerName.QRCode }"
    :icon="Icon"
    :title="$t('qrcode.title')"
    :description="$t('qrcode.slogan')"
  />
</template>

<script setup lang="ts">
import BaseCard from './index.vue';

import Icon from '@/assets/icon-svg/qrcode.svg';
</script>
<script lang="ts">
export default { name: 'CardQRCode' };
</script>
