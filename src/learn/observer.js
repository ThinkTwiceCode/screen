function Observer(obj = {}, prop = 'default', callback = (v) => console.log(`default: ${v}`)) {
  Object.defineProperty(obj, 'configurable', {
    configurable: true,
    value: 'configurable',
  });

  Object.defineProperty(obj, 'enumerable', {
    enumerable: true,
    value: 'enumerable',
  });

  Object.defineProperty(obj, 'writable', {
    writable: true,
    value: 'writable',
  });

  ['no_configurable', 'no_enumerable', 'no_writable'].forEach((key) => {
    Object.defineProperty(obj, key, {
      value: key,
    });
  });

  let value = obj[prop];
  Object.defineProperty(obj, prop, {
    get() {
      return value ?? 'None';
    },
    set(val) {
      if (value === val) {
        return;
      }
      value = val;
      callback(val);
    },
  });

  return obj;
}

function BatchObserver(obj = {}) {
  Object.defineProperties(obj, {
    one: {
      value: '1',
      writable: true,
    },
    two: {
      writable: true,
    }
  });

  return obj;
}