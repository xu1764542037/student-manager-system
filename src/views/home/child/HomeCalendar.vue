 <template>
   <div>
     <el-calendar id="calendar" v-model="value">
     </el-calendar>
   </div>
 </template>




<script>
export default {
  data() {
    return {
      value: new Date()
    }
  }
}
</script>


<style>
  #calendar {
    position: relative;
    width: 60%;
    height: 10%;
    border-radius: 10px;
    background: rgba(255, 255, 255, .3);

  }

</style>