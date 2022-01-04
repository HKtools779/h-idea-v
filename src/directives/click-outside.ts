import type { ObjectDirective, DirectiveBinding } from 'vue'

const addListener = function (el: HTMLElement, callback: any) {
  const fn = function (this: any, event: any) {
    if (!el.contains(event.target)) {
      callback && callback.call(this, event)
    }
  }
  el.__clickOutsideCallBack__ = fn;
  document.addEventListener('mouseup', fn);
}

const removeListener = function (el: HTMLElement) {
  document.removeEventListener('mouseup', el.__clickOutsideCallBack__);
}

const ClickOutSide: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    addListener(el, binding.value)
  },
  beforeUnmount(el: HTMLElement, binding: DirectiveBinding) {
    removeListener(el)
  }
}

export default ClickOutSide