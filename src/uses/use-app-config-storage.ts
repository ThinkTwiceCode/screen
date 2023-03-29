import { reactive } from 'vue';
import { useStorage } from '@vueuse/core';

import { LocalStorageKeys } from '@/consts/storage';

export function useAppConfigStorage() {
  const store = useStorage(LocalStorageKeys.AppConfig, {
    darkMode: false,
    localUseZhCN: true,
  }, localStorage);
  
  
  return reactive(store.value);
}
