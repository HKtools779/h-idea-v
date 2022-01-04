import type { ObjectDirective, DirectiveBinding } from 'vue'

const Focus: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if(binding.value){
      el.focus();
    }
  },
  updated(el:HTMLElement,binding:DirectiveBinding){
    if(binding.value){
      el.focus();
    }
  }
}

export default Focus