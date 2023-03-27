import '@vue/runtime-core';
import { ref, reactive, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';

import type { Plugin, App, Ref, UnwrapNestedRefs } from 'vue';

type DeviceType = {
  isMobile: Ref<boolean>,
}

/**@constant 定义移动设备的最大宽度（px） */
const maxMobileDeviceWidth = 600;

const isMobile = ref(false);
const $device:DeviceType = {
  isMobile,
};
let initialized = false;

export function useDevice() {
  if (initialized) {
    return $device;
  }

  initialized = true;
  const { width } = useWindowSize();

  watch(
    width,
    (val) => {
      isMobile.value = val <= maxMobileDeviceWidth;
    },
    { immediate: true },
  );

  return $device;
}

export function createDevicePlugin():Plugin {
  useDevice();

  return {
    install(app: App<any>) {
      app.config.globalProperties.$device = reactive($device);
    },
  };
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $device: UnwrapNestedRefs<DeviceType>;
  }
}