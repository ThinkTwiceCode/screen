import { onMounted, onBeforeUnmount } from 'vue';
import { findParentByClassName } from '@/utils/dom';

type WaterRippleEvent = {
  isTrusted: boolean,
  clientX: number,
  clientY: number,
};

function showWaterRipple(wrapEl: HTMLElement, e: WaterRippleEvent) {
  if (!e.isTrusted) {
    return;
  }

  const originStyle = {
    position: wrapEl.style.position,
    overflow: wrapEl.style.overflow,
  };

  function addStyle() {
    if ([null, undefined, '', 'static'].includes(originStyle.position)) {
      wrapEl.style.position = 'relative';
    }

    if ('hidden' !== originStyle.overflow) {
      wrapEl.style.overflow = 'hidden';
    }
  }

  function recoverStyle() {
    Object.assign(wrapEl.style, originStyle);
  }

  addStyle();

  const { clientX, clientY } = e;
  const { offsetLeft, offsetTop } = wrapEl;
  const x = clientX - offsetLeft;
  const y = clientY - offsetTop;

  const circle = document.createElement('sapn');
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.position = 'absolute';
  circle.style.transform = 'translate(-50%, -50%)';
  circle.style.backgroundColor = 'rgb(211, 211, 211)';
  circle.style.borderRadius = '50%';

  wrapEl.appendChild(circle);

  const animte = circle.animate([
    { width: '0px', height: '0px', opacity: 1 },
    { width: '400px', height: '400px', opacity: 0 },
  ], {
    duration: 1000,
    iterations: 1,
    easing: 'linear',
    fill: 'backwards',
  });
  animte.addEventListener('finish', () => {
    circle.remove();
    recoverStyle();
  });
}

export function addWaterRipple(wrapEl: HTMLElement | Array<HTMLElement>) {
  if (Array.isArray(wrapEl)) {
    wrapEl.forEach(addWaterRipple);
    return;
  }

  wrapEl.addEventListener('click', function (e) {
    showWaterRipple(wrapEl, e);
  });
}

export function mountWaterRipple(className: string, scopeEl: HTMLElement = document.body) {
  function clickListener(e: MouseEvent) {
    const targetEl = findParentByClassName(e.target as HTMLElement, className);
    if (targetEl) {
      showWaterRipple(targetEl, e);
    }
  }

  function touchListener(e: TouchEvent) {
    const targetEl = findParentByClassName(e.target as HTMLElement, className);
    if (!targetEl) {
      return;
    }

    const { clientX, clientY }= e.touches[0];
    const obj: WaterRippleEvent = {
      clientX,
      clientY,
      isTrusted: e.isTrusted,
    };
    showWaterRipple(targetEl, obj);
  }

  scopeEl.addEventListener('click', clickListener);
  scopeEl.addEventListener('touchstart', touchListener);

  return () => {
    scopeEl.removeEventListener('click', clickListener);
    scopeEl.removeEventListener('touchstart', touchListener);
  }
}

export function useWaterRipple(className: string, scopeEl?: HTMLElement) {
  onMounted(() => {
    onBeforeUnmount(mountWaterRipple(className, scopeEl));
  });
}

export function useFixedWaterRipple() {
  type LikeClickEvent = {
    pageX: number,
    pageY: number,
  };

  function clickListener(e: LikeClickEvent) {
    const { pageX, pageY }= e;

    const circle = document.createElement('sapn');
    circle.style.left = `${pageX}px`;
    circle.style.top = `${pageY}px`;
    circle.style.position = 'fixed';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.backgroundColor = 'rgb(233, 233, 233)';
    circle.style.borderRadius = '50%';
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = String(2 ** 32 - 1);

    document.body.appendChild(circle);

    const animte = circle.animate([
      { width: '0px', height: '0px', opacity: 0.5 },
      { width: '400px', height: '400px', opacity: 0 },
    ], {
      duration: 1000,
      iterations: 1,
      easing: 'linear',
      fill: 'backwards',
    });
    animte.addEventListener('finish', () => {
      circle.remove();
    });
  }

  function touchListener(e: TouchEvent) {
    const { pageX, pageY } = e.touches[0];
    clickListener({ pageX, pageY });
  }

  onMounted(() => {
    document.body.addEventListener('click', clickListener);
    document.body.addEventListener('touchstart', touchListener);
  });

  onBeforeUnmount(() => {
    document.body.removeEventListener('click', clickListener);
    document.body.removeEventListener('touchstart', touchListener);
  });
}