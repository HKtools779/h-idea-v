<template>
  <div
    class="h-input-wheel"
    :class="{ 'inWheelMode': inWheelMode, 'inEidt': inEdit }"
    v-clickoutside="handleOutSideClick"
    v-mousewheel:[inWheelMode]="handleWheel"
    @click="handleClick"
  >
    <div
      v-for="(item,index) in chartArr"
      class="h-input-wheel-item"
      :class="{ 'isNumber': item !== '.' }"
      :item-index="index"
      :key="index"
    >{{ item }}</div>
    <i
      class="iconfont"
      :class="{ 'icon-xiugai': !inEdit, 'icon-shanchu': inEdit }"
      @click.stop="handleIconClick"
    ></i>
    <input
      v-focus="inEdit"
      class="h_input_edit"
      type="text"
      :value="inputEditString"
      @input.stop="handleEditInput"
      ref="inputElement"
    />
    <slot
      :inWheelMode="inWheelMode"
      :inEdit="inEdit"
      :inputEditString="inputEditString"
      :chartArr="chartArr"
      :addIntegerZero="addIntegerZero"
      :addDecimalZero="addDecimalZero"
      :integerMinLength="integerMinLength"
      :decimalMinLength="decimalMinLength"
      :delay="delay"
      :modelValue="modelValue"
    ></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
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
const emit = defineEmits(['update:modelValue', 'intoWheelMode', 'outWheelMode', 'intoEditMode', 'editInput', 'outEditMode', 'clearAll']);

let inputEditString = ref('');
const handleEditInput = (e: InputEvent) => {
  const value = e.target.value;
  if (isNaN(Number(value))) {
    e.target.value = inputEditString.value;
  } else {
    inputEditString.value = '';
    inputEditString.value = value.trim();
    emit('editInput', inputEditString.value)
  }
}

const chartArr = computed(() => {
  let modelString = '';
  const rawModelString = String(props.modelValue);
  if (rawModelString.includes('e')) {
    const sciArr = rawModelString.split('e'),
      frontArr = sciArr[0].split('.');
    let decimalLength = 0
    if (frontArr.length === 2) {
      decimalLength = frontArr[1].length;
    }
    if (sciArr[1][0] === '-') {
      modelString = Number(props.modelValue).toFixed(Number(sciArr[1].slice(1)) + decimalLength);
    } else {
      modelString = frontArr.join('');
      for (let i = 0; i < (Number(sciArr[1].slice(1)) - decimalLength); i++) {
        modelString += '0';
      }
    }
  } else {
    modelString = rawModelString;
  }
  const towPart = modelString.split('.');
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
  res.push('.');
  res.push(...decimalArr);
  for (let i = 0; i < zeroDecimalCount; i++) {
    res.push('0');
  }
  inputEditString.value = res.join('');
  return res;
})

const inEdit = ref(false);

const inWheelMode = ref(false);
const handleClick = () => {
  if (!inWheelMode.value && !inEdit.value) {
    inWheelMode.value = true;
    emit('intoWheelMode', inputEditString.value);
  }
}

const handleIconClick = () => {
  if (inWheelMode.value) {
    inWheelMode.value = false;
    emit('outWheelMode', inputEditString.value);
  }
  if (!inEdit.value) {
    inEdit.value = true;
    emit('intoEditMode', inputEditString.value);
  } else {
    emit('clearAll', inputEditString.value);
    inputEditString.value = '';
  }
}

const handleOutSideClick = () => {
  if (inWheelMode.value) {
    inWheelMode.value = false;
    emit('outWheelMode', inputEditString.value);
  }
  if (inEdit.value) {
    inEdit.value = false;
    emit('update:modelValue', Number(inputEditString.value));
    emit('outEditMode', inputEditString.value);
  }
}

const rawHandleWheel = (e: any) => {
  e.preventDefault && e.preventDefault();
  if (e.target.className.split(' ').includes('isNumber') && inWheelMode.value) {
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
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  outline: #dddddd 2px solid;
  outline-offset: -2px;
  background-color: white;
  border-radius: 8px;
  padding: 0 8px;
  transition: border-color 0.2s;
  color: #444444;
}
.h-input-wheel:hover {
  outline-color: #bbbbbb;
}
.h-input-wheel.inWheelMode {
  outline-color: #409eff;
}
.h-input-wheel.inEidt {
  outline-color: #409eff;
}
.h-input-wheel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.isNumber {
  width: 17px;
  height: 40px;
  transition: background-color 0.4s;
}
.inWheelMode .isNumber:hover {
  background-color: #409eff;
  color: white;
}

.h-input-wheel.inEidt .h-input-wheel-item {
  visibility: hidden;
}

.h_input_edit {
  position: absolute;
  right: 36px;
  width: calc(100% - 46px);
  height: calc(100% - 4px);
  margin: 0;
  border: 0;
  padding: 0 0 0 2px;
  outline: 0;
  letter-spacing: 4px;
  color: #444444;
  visibility: hidden;
  font-size: 20px;
}
.h-input-wheel.inEidt .h_input_edit {
  visibility: visible;
}

.iconfont {
  width: 24px;
  height: 24px;
  line-height: 24px;
  font-size: 22px;
  margin-left: 5px;
  transition: color 0.2s;
  text-align: center;
}
.iconfont:hover {
  color: #409eff;
}
.icon-shanchu {
  font-size: 18px;
}
</style>