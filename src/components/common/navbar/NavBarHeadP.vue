<template>
  <div class="nav-bar-head-p">
    <div v-if="!isActive" @click="active"><slot name="headP"></slot></div>
    <div v-else @click="active"><slot name="headP2"></slot></div>
    <div><slot name="2nd-title"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBarHeadP",
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    active() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style scoped>
  .nav-bar-head-p img {
    width: 50px;
    height: 50px;
    position: absolute;
    margin-left: 55%;
    padding-top: .3%;
    transition: .1s;
    border-radius: 25px 25px 25px 25px;
  }

  .nav-bar-head-p img:hover{
    width: 52px;
    height: 52px;
    cursor:pointer;
  }
</style>