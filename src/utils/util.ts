import { ref } from "vue";

let inFirefox = false;
if (navigator.userAgent.indexOf('Firefox') >= 0) {
  inFirefox = true;
}
export const isFirefox = ref(inFirefox);

export const throttle = (fn: (...args: any[]) => any, delay = 200, fn2: (...args: any[]) => any = () => { }) => {
  let timer: any = null;
  return function (...args: Array<any>) {
    if (!timer) {
      timer = setTimeout(() => {
        const res = fn.apply(this, args);
        timer = null;
        return res;
      }, delay)
    } else {
      fn2.apply(this, args);
    }
  }
}