export function useMobileOnBack(callback: Function) {
  history.pushState(null, "", location.href);
  const popstateFun = () => {
      callback();
      window.removeEventListener("popstate", popstateFun);
  }
  window.addEventListener("popstate", popstateFun);
}