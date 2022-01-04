<template>
  <div
    class="h-input-wheel"
    :class="{ 'inChangeModel': inChangeModel }"
    v-clickoutside="handleCancle"
    v-mousewheel="handleWheel"
    :_preventWheel="inChangeModel"
    @click="handleClick"
  >
    <div
      v-for="(item,index) in chartArr"
      class="h-input-wheel-item"
      :class="{ 'isNumber': item !== '.' }"
      :item-index="index"
      :key="index"
    >{{ item }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
  modelValue: Number,
  addIntegerZero: {
    type: Boolean,
    default: false
  },
  addDecimalZero: {
    type: Boolean,
    default: false
  },
  integerMinLength: {
    type: Number,
    default: 8
  },
  decimalMinLength: {
    type: Number,
    default: 8
  },
  delay: {
    type: Number,
    default: 50
  }
});
const emit = defineEmits(['update:modelValue']);

const chartArr = computed(() => {
  const towPart = String(props.modelValue).split('.');
  let integerArr = towPart[0].split(''),
    decimalArr: string[] = [];
  if (towPart.length === 2) {
    decimalArr = towPart[1].split('');
  }
  let zeroIntegerCount = 0,
    zeroDecimalCount = 0;
  if (props.addIntegerZero) {
    zeroIntegerCount = integerArr.length >= props.integerMinLength ? 0 : props.integerMinLength - integerArr.length;
  }
  if (props.addDecimalZero) {
    zeroDecimalCount = decimalArr.length >= props.decimalMinLength ? 0 : props.decimalMinLength - decimalArr.length;
  }
  const res: string[] = [];
  for (let i = 0; i < zeroIntegerCount; i++) {
    res.push('0');
  }
  res.push(...integerArr);
  res.push('.')
  res.push(...decimalArr);
  for (let i = 0; i < zeroDecimalCount; i++) {
    res.push('0');
  }
  return res;
})

const inChangeModel = ref(false);
const handleClick = () => {
  if (!inChangeModel.value) {
    inChangeModel.value = true;
  }
}
const handleCancle = () => {
  inChangeModel.value = false;
}

const rawHandleWheel = (e: any) => {
  e.preventDefault && e.preventDefault();
  if (e.target.className.split(' ').includes('isNumber') && inChangeModel.value) {
    const index = e.target.attributes.getNamedItem('item-index').value;
    const newchartArr = [...chartArr.value];
    const currentNumber = newchartArr[index];
    if (e.wheelDeltaY > 0) {
      if (currentNumber === '9') {
        newchartArr[index] = '0';
      } else {
        newchartArr[index] = String(1 + Number(newchartArr[index]));
      }
    } else if (e.wheelDeltaY < 0) {
      if (currentNumber === '0') {
        newchartArr[index] = '9';
      } else {
        newchartArr[index] = String(Number(newchartArr[index]) - 1);
      }
    }
    emit('update:modelValue', Number(newchartArr.join('')));
  }
}
import { throttle } from '../utils/util';
const handleWheel = throttle(rawHandleWheel, props.delay);
</script>

<style scoped>
.h-input-wheel {
  border: #dddddd 2px solid;
  background-color: white;
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  transition: border-color 0.2s;
}
.h-input-wheel:hover {
  border-color: #bbbbbb;
}
.h-input-wheel.inChangeModel {
  border-color: #409eff;
}
.h-input-wheel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
}
.isNumber {
  width: 17px;
  height: 40px;
  transition: background-color 0.4s;
}
.inChangeModel .isNumber:hover {
  background-color: #409eff;
  color: white;
}
</style>