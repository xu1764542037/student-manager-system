<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import TableClass from "./child/TableClass";
import TableCourse from "./child/TableCourse";
import TableStudent from "./child/TableStudent";


export default {
  name: "Table",
  components: {
    TableClass,
    TableStudent,
    TableCourse
  }
}
</script>

<style scoped>
h1{
  position: absolute;
  margin-top: 20%;
  margin-left: 43%;
}
</style>