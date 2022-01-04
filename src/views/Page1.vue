<template>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner">
      <HInputWheel
        :addIntegerZero="true"
        :addDecimalZero="true"
        :integerMinLength="8"
        v-model="dataOfWheel"
      />
    </div>
  </div>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner">
      <div style="width: 200px;height: 200px;background-color: white;" />
    </div>
  </div>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner">
      <div style="width: 200px;height: 200px;background-color: white;" />
    </div>
  </div>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner">
      <div style="width: 200px;height: 200px;background-color: white;" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import HInputWheel from '../components/HInputWheel.vue';
const dataOfWheel = ref(3.1415926);
</script>

<style scoped>
.item {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 1px;
  padding: 20px 15px;
  background-color: cadetblue;
}
.title {
  font-size: 30px;
  color: rgb(173, 200, 235);
  font-weight: bolder;
  margin-bottom: 10px;
}
.inner {
  padding: 20px 30px;
  background-color: lightgoldenrodyellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>