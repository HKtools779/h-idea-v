<template>
  <div
    class="h-input-wheel"
    :class="{ 'inChangeModel': inChangeModel, 'inEidt': inEdit }"
    v-clickoutside="handleOutSideClick"
    v-mousewheel:[inChangeModel]="handleWheel"
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
      v-foucs="inEdit"
      class="h_input_edit"
      type="text"
      :value="inputEidtString"
      @input="handleEditInput"
    />
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
const emit = defineEmits(['update:modelValue']);

let inputEidtString = ref('');
const handleEditInput = (e: InputEvent) => {
  const value = e.target.value;
  if (isNaN(Number(value))) {
    e.target.value = inputEidtString.value;
  } else {
      inputEidtString.value = ''
      inputEidtString.value = value.trim();
  }
}

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
  res.push('.');
  res.push(...decimalArr);
  for (let i = 0; i < zeroDecimalCount; i++) {
    res.push('0');
  }
  inputEidtString.value = res.join('');
  return res;
})

const inChangeModel = ref(false);
const handleClick = () => {
  if (!inChangeModel.value) {
    inChangeModel.value = true;
  }
}

const inEdit = ref(false);
const handleIconClick = () => {
  if (!inEdit.value) {
    inEdit.value = true;
    inChangeModel.value = false;
  } else {
    inputEidtString.value = '';
  }
}

const handleOutSideClick = () => {
  inChangeModel.value = false;
  if (inEdit.value) {
    inEdit.value = false;
    emit('update:modelValue', Number(inputEidtString.value));
  }
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
  position: relative;
  display: flex;
  align-items: center;
  border: #dddddd 2px solid;
  background-color: white;
  border-radius: 8px;
  padding: 0 8px;
  transition: border-color 0.2s;
  color: #444444;
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
  font-size: 20px;
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

.h-input-wheel.inEidt .h-input-wheel-item {
  visibility: hidden;
}

.h_input_edit {
  position: absolute;
  right: 36px;
  width: calc(100% - 44px);
  margin: 0;
  border: 0;
  padding: 0;
  color: #444444;
  outline: 0;
  line-height: 1;
  letter-spacing: 5px;
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