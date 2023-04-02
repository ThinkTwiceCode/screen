export function findParentByClassName(el: null | HTMLElement, className: string, maxDeep = 10): null | HTMLElement {
  if (maxDeep < 0 || !el) {
    return null;
  }
  
  if (el.classList.contains(className)) {
    return el;
  }

  return findParentByClassName(el.parentElement, className, maxDeep - 1);
}
