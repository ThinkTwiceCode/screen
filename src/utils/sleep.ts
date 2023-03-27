import { nextTick } from 'vue';

export function sleep(duration: number = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

/**
 * 
 * @param callback - 回调，与nextTick一样
 * @param firstCallback - 在nextTick后调用
 * @param duration - 当nextTick耗时大于duration时，会直接调用callback。否则会在duration(ms)之后调用callback
 */
export async function delayNextTick(callback: Function, firstCallback: null | ((useTime: number) => void), duration:number = 1000): Promise<void> {
  const start = Date.now();
  await nextTick();

  if (!Number.isInteger(duration)) {
    return Promise.resolve();
  }

  const useTime = Date.now() - start;
  if (useTime < duration) {
    if (typeof firstCallback === 'function') {
      firstCallback(useTime);
    }
    await sleep(duration - useTime);
  }

  if (typeof callback === 'function') {
    callback();
  }
  return Promise.resolve();
}
