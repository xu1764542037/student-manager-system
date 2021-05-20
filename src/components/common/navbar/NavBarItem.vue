<template>
  <div>
    <div class="nav-bar-item" @click="itemClick">
      <div class="item-1st"><slot></slot></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NavItem",
  props: {
    path: String,
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.item-1st {
  height: 45px;
  width: 10%;
  text-align: center;
  float: left;
  padding-top: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #66553E;
  /*设置延时*/
  -webkit-transition: .5s all;

}
.item-1st:hover {

}

</style>