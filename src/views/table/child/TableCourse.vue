<template>
  <div id="TableStudent">
    <div id="tableBox">
      <!--        输入框区-->
      <div>
        <span class="text" id="nameText">姓名:&nbsp;<input type="text" v-model="name" placeholder=" 点此输入名称" style="z-index: 1" class="selectName"/></span>
        <span class="text">等级:&nbsp;<input type="text" v-model="description"  placeholder=" 点此输入等级" class="selectDescription"/></span>
        <span class="text">状态:&nbsp;<select id="choseStatus" v-model="status">
          <option name="class" disabled>---选择课程状态---</option>
          <option v-for="status in statuses">{{status}}</option>
          </select></span>
      </div>

      <!--        按钮区-->
      <div id="btns">
        <input class="btn" type="button" value="查询" @click="selectByCondition"/>
        <input class="btn" type="button" value="刷新" @click="refresh"/>
        <input class="btn" type="button" value="添加" @click="changShowAddBox"/>
        <input class="btn" type="button" value="删除" @click="batchDelete"/>
      </div>

      <!--        表格区-->
      <div>
        <table id="table">
          <thead>
          <tr>
            <th style="width: 60px;"><input type="checkbox" id="cbAll" @click="allCheck($event)"/></th>
            <th style="width: 200px;">编号</th>
            <th style="width: 300px;">名称</th>
            <th style="width: 400px;">日期</th>
            <th style="width: 200px;">等级</th>
            <th style="width: 250px;">状态</th>
            <th style="width: 250px;">操作</th>
          </tr>
          </thead>
          <tbody id="tbody">
          <tr v-for="(data,index) in currentData">
            <td class="cb"><input class="cbObj" type="checkbox" v-model="checkData" :value="data.id" @click="seeData"/></td>
            <td class="id">{{data.id}}</td>
            <td class="name">{{data.name}}</td>
            <td class="create">{{data.create.split("T")[0]}}</td>
            <td class="description">{{data.description}}</td>
            <td class="status">{{data.status}}</td>
            <td class="edit"><span class="update" @click="editData($event)">修改</span>
              <span class="nbsp" v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"></span>
              <span class="Delete" @click="deleteData">删除</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--        添加框-->
      <div id="addBoxBG" v-show="isShowAddBox">
        <div id="addBox">
          <div>
            <div v-if="isClose" @click="changShowAddBox"  @mouseleave="changClose"><img src="~assets/img/close1.svg" width="30px" height="30px"></div>
            <div v-else @click="changShowAddBox"  @mouseover="changClose"><img src="~assets/img/close2.svg" width="30px" height="30px"></div>
          </div>
          <div id="add-Box-Inputs">
            <h3>{{addBoxName}}</h3>
            <span class="addBoxInput">名称：<input type="text" placeholder=" 在此输入课程名称" class="addBoxName"/></span>
            <span class="addBoxInput">日期：<input type="text" placeholder=" 在此输入课程日期" class="addBoxCreate"/></span>
            <span class="addBoxInput">等级：<input type="text" placeholder=" 在此输入课程等级" class="addBoxDescription"/></span>
            <span class="addBoxInput">状态：<input type="text" placeholder=" 在此输入课程状态" class="addBoxStatus"/></span>
          </div>
          <button id="addBoxBtn" @click="addOrUpdateData">确认</button>
        </div>
      </div>


      <!--        分页区-->
      <div id="paging">
        <span id="totalNum">共{{totalDataNum}}条</span>
        <select id="chosePage" @click="optionPage($event)">
          <option class="pages"  selected="selected" disabled>10条/页</option>
          <option class="pages" v-for="item in pageNum">第{{item}}页</option>
        </select>
        <div id="pageBtns">
          <button  v-for="item in pageNum" @click="changePage(item)" class="pagingBtn">{{item}}</button>
        </div>
        <div id="pageInput">
          <input type="text" placeholder=" 请输入页数" class="goPageInput"/>
          <button @click="goPage">GO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {select} from "@/network/tableCourse";
import {selectStatus} from "@/network/tableCourse";
import {selectByCondition} from "@/network/tableCourse";
import {deleteData} from "@/network/tableCourse";
import {addData} from "@/network/tableCourse";
import {updateData} from "@/network/tableCourse";
import {batchDeleteData} from "@/network/tableCourse";


export default {
  name: "TableCourse",
  data() {
    return {
      //总数据
      totalData: [],
      //总数据条数
      totalDataNum: 0,
      //每页显示的数据条数(默认10条每页)
      pageDataNum: 10,
      //当前页数
      currentPage: 1,
      //当前页应该显示的数据
      currentData: [],
      //总共页数
      pageNum: 0,
      //course表总共状态
      statuses: [],
      //数据id
      id: null,
      //数据name
      name: null,
      //数据status
      status: null,
      //数据description
      description: null,
      //是否关闭添加窗口图标
      isClose: false,
      //添加修改框名字
      addBoxName: null,
      //是否打开添加修改框
      isShowAddBox: false,
      //添加或者修改：默认ture(添加), false为修改
      isAdd: true,
      //要修改id值
      updateId: null,
      //复选框选中的数据
      checkData: []
    }
  },
  watch: { // 监视双向绑定的数据数组
    checkData: {
      handler(){ // 数据数组有变化将触发此函数
        if(this.checkData.length == this.pageDataNum){
          document.querySelector("#cbAll").checked = true;
        }else {
          document.querySelector("#cbAll").checked = false;
        }
      },
      deep: true // 深度监视
    }
  },
  methods: {
    //查询按钮
    selectByCondition () {
      //当数据为空时做判断
      if (this.name == null) {
        this.name = ''
      }
      if (this.description == null) {
        this.description = ''
      }
      if (this.status == null) {
        this.status = ''
      }
      //对取到的查询出来的数据进行处理
      selectByCondition(this.name, this.description, this.status).then(res => {
        // console.log(res);
        this.currentData.splice(0,10)
        //给数据赋值
        this.totalData = res.obj
        //给总数据条数赋值
        this.totalDataNum = res.obj.length;
        //给总页数赋值
        this.pageNum = this.totalData.length / this.pageDataNum
        this.pageNum = Math.ceil(this.pageNum);

        if (this.totalDataNum >=10 ){
          for (let i= 0;i< 10 ;i++){
            this.currentData.push(this.totalData[i])
          }
        }else {
          for (let i= 0;i< this.totalDataNum ;i++){
            this.currentData.push(this.totalData[i])
          }
        }

      })
    },
    //刷新按钮
    refresh() {
      this.name = ''
      this.description = ''
      this.status = ''
      this.currentData.splice(0,10)

      let pageBtns = document.querySelectorAll(".pagingBtn");
      //遍历其他页面按钮，再让当前点击按钮变背景色
      for (let i=0;i<pageBtns.length;i++) {
        pageBtns[i].style.background = "rgba(255,255,255,.5)";
      }
      pageBtns[0].style.background = "#B3B3B3";

      //对数据进行处理
      select().then(res => {
        // console.log(res);
        //给总数据赋值
        this.totalData = res.obj
        //给总数据条数赋值
        this.totalDataNum = res.obj.length;
        //给总页数赋值
        this.pageNum = this.totalData.length / this.pageDataNum
        this.pageNum = Math.ceil(this.pageNum);


        for (let i= 0;i< 10 ;i++){
          this.currentData.push(this.totalData[i])
        }
      })
    },
    //添加按钮
    changShowAddBox() {
      //将isAdd状态改为true(添加)
      this.isAdd = true
      this.addBoxName = "添加"


      document.querySelector(".addBoxName").value = ''
      document.querySelector(".addBoxCreate").value = ''
      document.querySelector(".addBoxDescription").value = ''
      document.querySelector(".addBoxStatus").value = ''


      this.isShowAddBox = !this.isShowAddBox

    },
    //批量删除数据
    batchDelete() {
      // const array = JSON.stringify(this.checkData)

      // console.log(array);
      let ids = null+",";
      for (let i =0;i< this.checkData.length;i++){
        ids += this.checkData[i]+","
      }
      if (confirm("确认删除选中的数据吗？")){
        batchDeleteData(ids).then( res => {
          console.log(res);
          if (res.message == "删除成功"){
            alert("删除成功")
            this.refresh()
          }else if (res.message == "删除失败") {
            alert("删除失败")
            this.refresh()
          }
        })
      }
    },
    //添加修改框确认按钮
    addOrUpdateData() {
      if (this.isAdd) {
        let name = document.querySelector(".addBoxName").value
        let create = document.querySelector(".addBoxCreate").value
        let description = document.querySelector(".addBoxDescription").value
        let status = document.querySelector(".addBoxStatus").value

        if (confirm("确认添加数据吗？")){
          addData(name,create,description,status).then( res => {
            if (res.message == "新增成功"){
              alert("添加数据成功")
              document.querySelector(".addBoxName").value = ''
              document.querySelector(".addBoxCreate").value = ''
              document.querySelector(".addBoxDescription").value = ''
              document.querySelector(".addBoxStatus").value = ''
              this.isShowAddBox = !this.isShowAddBox
              this.refresh()
            }else {
              alert("添加数据失败")
              this.refresh()
            }
          })
        }
      }else {
        let name = document.querySelector(".addBoxName").value
        let create = document.querySelector(".addBoxCreate").value
        let description = document.querySelector(".addBoxDescription").value
        let status = document.querySelector(".addBoxStatus").value
        updateData(this.updateId,name,create,description,status).then( res => {
          // alert(this.updateId)
          // console.log(res);
          if (res.message == "修改成功") {
            alert("修改数据成功")
            document.querySelector(".addBoxName").value = ''
            document.querySelector(".addBoxCreate").value = ''
            document.querySelector(".addBoxDescription").value = ''
            document.querySelector(".addBoxStatus").value = ''
            this.isShowAddBox = !this.isShowAddBox
            this.refresh()
          }else {
            alert("修改数据失败")
            this.refresh()
          }
        })
      }
    },
    //是否关闭弹窗图标
    changClose() {
      this.isClose = !this.isClose
    },
    //修改单条数据按钮
    editData(e) {
      //将确认按钮状态设置为false(修改)
      this.isAdd = false
      this.addBoxName = "修改"


      let trElement =  e.target.parentElement.parentElement;
      let id = trElement.querySelector(".id").innerHTML;
      let name = trElement.querySelector(".name").innerHTML;
      let create = trElement.querySelector(".create").innerHTML;
      let description = trElement.querySelector(".description").innerHTML;
      let status = trElement.querySelector(".status").innerHTML;


      this.updateId = id

      document.querySelector(".addBoxName").value = name
      document.querySelector(".addBoxCreate").value = create
      document.querySelector(".addBoxDescription").value = description
      document.querySelector(".addBoxStatus").value = status


      this.isShowAddBox = !this.isShowAddBox


    },
    //删除单条数据按钮
    deleteData(e) {
      let trElement =  e.target.parentElement.parentElement;
      let id = trElement.querySelector(".id").innerHTML;

      // console.log(id)
      if (confirm("确定删除这条信息？")) {
        deleteData(id).then( res => {
          if (res.message == "删除成功"){
            alert("删除成功")
            this.refresh()
          }else {
            alert("删除数据失败")
            this.refresh()
          }
        })
      }

    },
    //全选按钮
    allCheck(e) {
      //获取全部表格内的checkbox
      let checkObj = document.getElementsByClassName("cbObj")
      //全选按钮被选中时
      if (e.target.checked) {
        for (let i=0;i< 10;i++){
          if (!checkObj[i].checked) {
            this.checkData.push(checkObj[i].value)
          }
        }
        console.log(this.checkData);
      }else { // 如果是去掉全选则清空checkbox选项绑定数组
        this.checkData = [];
      }
    },
    //测试方法，查看checkData
    seeData(){
      console.log(this.checkData);
    },
    //改变分页数据
    changePage(item) {
      let pageBtns = document.querySelectorAll(".pagingBtn");
      //遍历其他页面按钮，再让当前点击按钮变背景色
      for (let i=0;i<pageBtns.length;i++) {
        pageBtns[i].style.background = "rgba(255,255,255,.5)";
      }
      pageBtns[item-1].style.background = "#B3B3B3";


      //如果数据除10余0则进行以下处理
      if (this.totalDataNum%10==0){
        if (item==1){
          //清空当前显示数据
          this.currentData.splice(0,10)
          item = 0
          for (let i = item;i< item+10;i++) {
            this.currentData.push(this.totalData[i])
          }
        }else {
          this.currentData.splice(0,10)
          item = item * 10 -11
          for (let i = item+1;i< item+11;i++) {
            this.currentData.push(this.totalData[i])
          }
        }
      }else {
        let remainder = this.totalDataNum % 10
        // console.log(remainder);
        if (item<=this.pageNum-1){
          if (item==1){
            this.currentData.splice(0,10)
            item = 0
            for (let i = item;i< item+10;i++) {
              this.currentData.push(this.totalData[i])
            }
          }else {
            this.currentData.splice(0,10)
            item = item * 10 -11
            for (let i = item+1;i< item+11;i++) {
              this.currentData.push(this.totalData[i])
            }
          }
        }else {
          this.currentData.splice(0,10)
          item = item * 10 -10
          for (let i = item;i< item+remainder;i++) {
            this.currentData.push(this.totalData[i])
          }
        }
      }
    },
    //去指定的数据页
    goPage() {

      let page = document.querySelector(".goPageInput").value
      if (page > this.pageNum){
        alert("没有此页，请重新输入")
      }
      if (page == null || page === ""){
        page = 1
      }
      this.changePage(page);
    },
    //通过select选择对应的页面
    optionPage(e) {
      let pageName = e.target.value;
      if (pageName == "10条/页"){
        return
      }
      let page = pageName.split("");
      this.currentPage = page[1]
      this.changePage(page[1])
    }
  },
  beforeCreate() {
    //对数据进行处理
    select().then(res => {
      console.log(res);
      //给总数据赋值
      this.totalData = res.obj
      //给总数据条数赋值
      this.totalDataNum = res.obj.length;
      //给总页数赋值
      this.pageNum = this.totalData.length / this.pageDataNum
      this.pageNum = Math.ceil(this.pageNum);


      for (let i= 0;i< 10 ;i++){
        this.currentData.push(this.totalData[i])
      }

    })

    //查找所有班级名称
    selectStatus().then(res => {
      console.log(res);
      for (let i = 0;i< res.obj.length ; i++ ){
        this.statuses.push(res.obj[i].status);
      }
    })
  }
}
</script>

<style scoped>
#TableStudent {
  z-index: -1;
  position: fixed;
  width: 96%;
  height: 89%;
  background: rgba(255, 255, 255, .5);
  margin-top: 4%;
  margin-left: 2%;
  border-radius: 10px;
}

#nameText{
  margin-left: 528px;

}

.selectName,.selectDescription,#choseStatus {
  margin-top: 10px;
  position: relative;
  width: 200px;
  height: 30px;
  border-radius: 10px;
  -webkit-transition: .5s all;
  outline: none;
  background: rgba(255,255,255,.5);
  border: 1px rgba(255,255,255,.5) solid;

}

.selectName:focus,.selectDescription:focus,#choseStatus:focus {
  border: 1px #2E58FF solid;
}

#btns{
  margin-left: 490px;
  margin-top: 20px;
}

.text {
  margin-left: 30px;
}

.btn {
  height: 30px;
  width: 120px;
  border-radius: 5px;
  outline: none;
  border: 0;
  margin-left: 80px;
  -webkit-transition: .5s all;

}

.btn:hover {
  background: #B3B3B3;
}

#table {
  position: relative;
  border-collapse: collapse;
  margin-left: 95px;
  text-align: center;
  margin-top: 30px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

}

tr:hover {
  background: #F5F7FA;
}

th {
  position: relative;
  border-top: 1px #EBEBEB solid;
  background: rgba(255,255,255,.7);
  height: 55px;
  margin-top: -300px;
  font-size: 16px;
  background: #F5F7FA;
}

td {
  border-top: 1px #EBEBEB solid;
  background: rgba(255,255,255,.7);
  height: 55px;
}

.Delete,.update {
  cursor: pointer;
}

#paging {
  position: absolute;
  bottom: 30px;
  margin-left: 115px;
}

#totalNum {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 24px;
}

#chosePage {
  position: absolute;
  margin-left: 100px;
  margin-top: 4px;
  width: 120px;
  height: 25px;
  outline: none;
  border-radius: 5px;
  background: rgba(255,255,255,.5);
  -webkit-transition: .5s all;

}

#chosePage:focus {
  border: 1px #2E58FF solid;

}

#pageBtns {
  width: 1000px;
  position: absolute;
  margin-left: 400px;
  margin-top: -28px;
  float: left;

}

.pagingBtn {
  width: 30px;
  height: 30px;
  border-radius: 2px;
  outline: none;
  border: 0;
  margin-left: 5px;
  cursor: pointer;
  -webkit-transition: .5s all;
  background: rgba(255,255,255,.5);

}

/*设置第一个分页按钮背景颜色*/
.pagingBtn:first-child {
  background: #B3B3B3;
}

.pagingBtn:hover {
  background: #B3B3B3;
}


#pageInput {
  position: absolute;
  padding-left: 1400px;
  float: left;
}

#pageInput input {
  position: absolute;
  margin-top: -25px;
  outline: none;
  border: 0;
  height: 25px;
  width: 150px;
  background: rgba(255,255,255,.5);
  border-radius: 5px;
}

#pageInput button {
  position: absolute;
  margin-top: -25px;
  margin-left: 170px;
  width: 25px;
  height: 25px;
  border: 0;
  background: rgba(255,255,255,.5);
  outline: none;
  -webkit-transition: .5s all;
  border-radius: 2px;

}

#pageInput button:focus {
  background: #B3B3B3;
}

#addBoxBG {
  position: absolute;
  width: 104.3%;
  height: 106.5%;
  bottom: -36.4px;
  right: -40px;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.6)
}

#addBox {
  position: absolute;
  width: 900px;
  height: 350px;
  background: #E1F2FD;
  margin-left: 26.5%;
  margin-top: 10%;
  box-shadow: 0 0  20px 1px #888888;
  z-index: 3;
  border-radius: 3px;
}

#addBox h3{
  margin: 10px;
}

#addBox img {
  position: absolute;
  margin-top: 2%;
  margin-left: 94%;
  -webkit-transition: .5s all;
  cursor: pointer;
}

#addBox img:hover {
  height: 32px;
  width: 32px;
}

.addBoxInput {
  float: left;
  padding-left: 80px;
  padding-top: 35px;
}

.addBoxInput input {
  width: 250px;
  height: 30px;
  border-radius: 3px;
  outline: none;
  -webkit-transition: .5s all;
  border: 1px black solid;
  background: #ECECEC;
}

.addBoxInput input:focus {
  border: 1px #A9B6BE solid;

}

#addBoxBtn{
  position: absolute;
  height: 40px;
  width: 150px;
  margin-left: -385px;
  margin-top: 250px;
  background:  #D8EEFD;
  /*background: #A9DCFD;*/
  border: 0;
  border-radius: 3px;
  outline: none;
  -webkit-transition: .5s all;
}

#addBoxBtn:hover {
  background: #A2D8FD;
  /*background: #FFF400;*/
}

</style>