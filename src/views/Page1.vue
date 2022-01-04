<template>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner">
      <HInputWheel
        :addIntegerZero="true"
        :addDecimalZero="true"
        :integerMinLength="5"
        v-model="dataOfWheel"
      />
    </div>
  </div>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner">
      <div
        style="position: relative; box-sizing: border-box; height: 200px; width: 200px;border: 10px solid #339933;padding: 40px; background-color: yellowgreen;"
      >
        <div
          style="position: absolute;  width: 100%; outline: 10px solid yellow; outline-offset: 10px; height: 100%; background-color: red; top: 0; left: 0;"
        ></div>
      </div>
    </div>
  </div>
  <div class="item">
    <div class="title">title！！！中文！</div>
    <div class="inner" style="position: relative; height: 200px;">
      <div style="position: absolute;width: 220px; height: 220px;background-color: thistle; z-index: 99;"></div>
      <div
        style="position: absolute; box-sizing: border-box; height: 200px; width: 200px;background-color: yellowgreen; z-index: 100;"
      >
        <div
          style="position: absolute;  width: 50%; height: 50%; background-color: red; top: 0; left: 0; z-index: 1000;"
        ></div>
      </div>
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