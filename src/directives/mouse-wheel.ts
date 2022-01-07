import normalizeWheel from 'normalize-wheel-es'
import { isFirefox } from '../utils/util'
import type { ObjectDirective, DirectiveBinding } from 'vue'

const perventMap = new Map();
interface AddWheel {
  (element: HTMLElement, callback: any, modifiers: Record<string, any>): void;
}
const addWheelListener: AddWheel = function (element, callback, modifiers = {}) {
  if (element && element.addEventListener) {
    const fn = function (this: any, event: any) {
      const prevent = perventMap.get(element);
      if (prevent) {
        event.preventDefault && event.preventDefault();
      }
      if (modifiers.stop) {
        event.stopPropagation && event.stopPropagation();
      }
      const normalized = normalizeWheel(event);
      callback && callback.apply(this, [event, normalized]);
    }
    if (isFirefox.value) {
      element.addEventListener('DOMMouseScroll', fn);
    } else {
      element.addEventListener('mousewheel', fn);
    }
  }
}

const Mousewheel: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    perventMap.set(el, Boolean(binding.arg));
    addWheelListener(el, binding.value, binding.modifiers);
  },
  beforeUpdate(el: HTMLElement, binding: DirectiveBinding) {
    perventMap.set(el, Boolean(binding.arg))
  },
  beforeUnmount(el){
    perventMap.delete(el);
  }
}

export default Mousewheel