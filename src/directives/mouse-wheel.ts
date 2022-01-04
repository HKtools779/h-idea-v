import normalizeWheel from 'normalize-wheel-es'
import { isFirefox } from '../utils/util'
import type { ObjectDirective, DirectiveBinding } from 'vue'

interface Fun1 {
  (element: HTMLElement, callback: any, modifiers: Record<string, any>): void;
}
interface Fun2 {
  (p: boolean): void;
}

const addWheelListenerCLosure = () => {
  let prevent = false;
  const setPervent: Fun2 = (p) => {
    prevent = p;
  }
  const addWheelListener: Fun1 = function (element, callback, modifiers = {}) {
    if (element && element.addEventListener) {
      const fn = function (this: any, event: any) {
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
  let res: [Fun1, Fun2] = [addWheelListener, setPervent];
  return res;
}

const Mousewheel: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const [addWheelListener, setPervent] = addWheelListenerCLosure();
    if (binding.arg) {
      setPervent(true);
    } else {
      setPervent(false);
    }
    el.__setPervent__ = setPervent;
    addWheelListener(el, binding.value, binding.modifiers);
  },
  beforeUpdate(el: HTMLElement, binding: DirectiveBinding) {
    const setPervent = el.__setPervent__;
    if (binding.arg) {
      setPervent(true);
    } else {
      setPervent(false);
    }
  }
}

export default Mousewheel