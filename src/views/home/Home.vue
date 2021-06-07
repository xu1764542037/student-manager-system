<template>
  <div id="home">
    <div id="left"><home-welcome></home-welcome></div>
    <div id="top"><home-title></home-title></div>
    <div id="bottom"><home-calendar></home-calendar></div>
  </div>
</template>

<script>
import HomeCalendar from "./child/HomeCalendar";
import HomeTitle from "./child/HomeTitle";
import HomeWelcome from "./child/HomeWelcome";

export default {
  name: "Home",
  components: {
    HomeCalendar,
    HomeTitle,
    HomeWelcome
  }
}
</script>

<style scoped>
  #home{
    position: fixed;
    z-index: -1;

  }

  #left {
    position: absolute;
    margin-top: 5%;
    margin-left: 5%;
    height: 89.2%;
    width: 20%;
    background: rgba(255, 255, 255, .5);
    border-radius: 10px;
  }

  #top {
    position: absolute;
    margin-top: 5%;
    margin-left: 32%;
    height: 15%;
    width: 60%;
    background: rgba(255, 255, 255, .5);
    border-radius: 10px;
  }

  #bottom {
    position: relative;
    height: 40%;
    width: 60%;
    margin-left: 32%;
    margin-top: 13%;
    background: rgba(255, 255, 255, .3);
    border-radius: 10px;
  }
</style>