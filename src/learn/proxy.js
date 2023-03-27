function CustomProxy(obj = {}) {
  return new Proxy(obj, {
    get(o, p) {
      return p;
    },
  });
}