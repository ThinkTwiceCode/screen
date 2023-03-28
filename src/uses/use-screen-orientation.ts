import { ref, onMounted, onBeforeUnmount} from 'vue';

export function useScreenOrientation(onPortrait?: Function, onLandscape?: Function) {
  const portrait = window.matchMedia("(orientation: portrait)");
  const isPortraitMode = ref(portrait.matches);

  function onOrientationChange(e: any) {
    console.log('onOrientationChange: ', e);
    isPortraitMode.value = Boolean(e.matches);
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
    portrait.addEventListener("change", onOrientationChange);
  });

  onBeforeUnmount(() => {
    portrait.removeEventListener('change', onOrientationChange);
  });

  return isPortraitMode;
}