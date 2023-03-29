import { reactive } from 'vue';
import { useStorage } from '@vueuse/core';

import { LocalStorageKeys } from '@/consts/storage';

import { $t } from '@/i18n/index';

export function useBarrageStorage() {
  const store = useStorage(LocalStorageKeys.Barrage, {
    text: $t('barrage.slogan'),
    color: '#222',
    backgroundColor: '#fff',
    fontSize: 30,
    scrollSpeed: 30,
  }, localStorage);
  
  
  return reactive(store.value);
}
