export default {
  addUserInfo(state,plyload){
    state.userId = plyload.userid
    state.userName = plyload.username
    state.userPwd = plyload.userpwd
    state.userPhone = plyload.userphone
    state.userEmail = plyload.useremail
    state.createDate = plyload.createdate

  }
}