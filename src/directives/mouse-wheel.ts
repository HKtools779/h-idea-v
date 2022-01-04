import normalizeWheel from 'normalize-wheel-es'
import { isFirefox } from '../utils/util'
import type { ObjectDirective, DirectiveBinding } from 'vue'

const mousewheel = function (element: HTMLElement, callback: any, modifiers: Record<string, any> = {}) {
  if (element && element.addEventListener) {
    const fn = function (this: any, event: any) {
      if (element.attributes.getNamedItem('_preventWheel')?.value==='true') {
        event.preventDefault && event.preventDefault();
      }
      if (modifiers.stop) {
        event.stopPropagation && event.stopPropagation();
      }
      const normalized = normalizeWheel(event)
      callback && callback.apply(this, [event, normalized])
    }
    if (isFirefox.value) {
      element.addEventListener('DOMMouseScroll', fn)
    } else {
      element.addEventListener('mousewheel', fn)
    }
  }
}

const Mousewheel: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    mousewheel(el, binding.value, binding.modifiers)
  }
}

export default Mousewheel