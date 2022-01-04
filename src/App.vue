<template>
  <div class="head" >
    <div class="title">
      h-idea-v用例演示
    </div>
  </div>
  <div class="content">
    <div class="left" />
    <div class="right" />
    <div class="center">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  props:{
    path:String
  },
  components: {
  },
  setup(){

  }
})
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
html::-webkit-scrollbar {
  display: none;
}
body::-webkit-scrollbar {
  display: none;
}
#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.head {
  background-color: #d5f5f6;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.title{
  margin-left: 140px;
  font-size: 44px;
  font-family: fantasy;
  color: darkcyan;
}
.content {
  position: absolute;
  margin-top: 80px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
}
.left ,.right{
  width: 240px;
  height: 100%;
  background-color: white;
}
.left{
  float: left;
}
.right {
  float: right;
}
.center {
  background-color: white;
  width: auto;
  height: 100%;
  overflow: scroll;
  overflow-x:hidden;
}
</style>

