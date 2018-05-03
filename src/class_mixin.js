'use strict';

function classMixin (behaviour, shared_behaviour = {}) {
  const instance_keys = Reflect.ownKeys(behaviour);
  const shared_keys = Reflect.ownKeys(shared_behaviour);
  const type_tag = Symbol('isa');

  function _mixin (clazz) {
    for (let property of instance_keys)
      Object.defineProperty(clazz.prototype, property, {
        value: behaviour[property],
        writable: true
      });
    Object.defineProperty(clazz.prototype, type_tag, { value: true });
    return clazz;
  }

  for (let property of shared_keys)
    Object.defineProperty(_mixin, property, {
      value: shared_behaviour[property],
      enumerable: shared_behaviour.propertyIsEnumerable(property)
    });
  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[type_tag]
  });

  return _mixin;
}

module.exports = classMixin;
