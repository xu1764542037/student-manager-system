<template>
  <div id="home">
    <h1>首页</h1>
    <h1>{{$store.state.userId}}</h1>
    <h1>{{$store.state.userName}}</h1>
    <h1>{{$store.state.userPwd}}</h1>
    <h1>{{$store.state.userPhone}}</h1>
    <h1>{{$store.state.userEmail}}</h1>
    <h1>{{$store.state.createDate}}</h1>
  </div>
</template>

<script>

export default {
  name: "Home",
}
</script>

<style scoped>
  #home{
    position: absolute;
  }
  h1{
    position: relative;
    margin-top: 20%;
    margin-left: 43%;
  }
</style>