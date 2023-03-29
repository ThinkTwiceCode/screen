import { ref, onMounted, onBeforeUnmount} from 'vue';

export function useScreenOrientation(onPortrait?: Function, onLandscape?: Function) {
  const isPortraitMode = ref(true); // 移动设备默认竖屏

  function onOrientationChange(e: any) {
    console.log('onOrientationChange: ', e);
    isPortraitMode.value = e.matches;
    if (e.matches) { // 竖屏模式（Portrait mode）
      if (typeof onPortrait === 'function') {
        onPortrait();
      }
    } else { // 横屏模式（Landscape mode）
      if (typeof onLandscape === 'function') {
        onLandscape();
      }
    }
  }
  
  onMounted(() => {
    const portrait = window.matchMedia("(orientation: portrait)");
    isPortraitMode.value = portrait.matches;
    portrait.addEventListener("change", onOrientationChange);

    onBeforeUnmount(() => {
      portrait.removeEventListener('change', onOrientationChange);
    });
  });

  return isPortraitMode;
}