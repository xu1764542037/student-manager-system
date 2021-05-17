<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
import Login from "./views/login/Login";

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
*{
  background: url("assets/img/loginBg.jpg") no-repeat fixed center;
  margin: 0;
  padding: 0;
}
body{
  font-family: PingFang-SC-Regular,Helvetica,"Microsoft Yahei","微软雅黑";
  overflow: hidden;
}
</style>
