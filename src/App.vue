<template>
  <div id="app">
    <Login v-if="$route.meta.showLoginBox"></Login>
    <index v-if="!$route.meta.showNav"></index>
    <router-view></router-view>
  </div>
</template>

<script>
import Index from "./components/context/index/Index"
import Login from "./components/common/login/Login";

export default {
  name: 'App',
  components: {
    Index,
    Login
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  font-family: PingFang-SC-Regular,Helvetica,"Microsoft Yahei","微软雅黑";
  overflow: hidden;
  background: url("./assets/img/loginBg.jpg") no-repeat fixed center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


input{
  padding-left: 5px;
}
</style>
