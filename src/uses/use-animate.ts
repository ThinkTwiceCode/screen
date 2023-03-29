import { isRef } from 'vue';

import type { Ref } from 'vue';

export function useAnimate(elOrRef: HTMLElement | Ref<HTMLElement>, keyframes?: Keyframe[], options?: KeyframeAnimationOptions) {
  function getEl(): HTMLElement | null {
    if (isRef(elOrRef)) {
      return elOrRef.value instanceof HTMLElement ? elOrRef.value : null;
    } else if (elOrRef instanceof HTMLElement) {
      return elOrRef;
    }
    return null;
  }

  function cancel() {
    const el = getEl();
    if (!el) return;

    el.getAnimations().forEach((anim) => {
      anim.cancel();
    });
  }

  function start(newKeyframes?: Keyframe[], newOptions?: KeyframeAnimationOptions) : Animation | null {
    if (newKeyframes) {
      keyframes = newKeyframes;
    }
    if (newOptions) {
      options = newOptions;
    }

    const el = getEl();
    if (!el) return null;

    cancel();

    if (!keyframes) return null;

    return el.animate(keyframes, options);
  }

  return {
    cancel,
    start,
  };
}
