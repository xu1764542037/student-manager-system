export default {
  addUserInfo(state,plyload){
    state.userId = plyload.userId
    state.userName = plyload.userName
    state.userPwd = plyload.userPwd
    state.userPhone = plyload.userPhone
    state.userEmail = plyload.userEmail
    state.createDate = plyload.createdate.split("T")[0]
  }
}