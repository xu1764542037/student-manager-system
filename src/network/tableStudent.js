import {request} from "./request";

export function select() {
  return request({
    url: "/student/select",
    method: "post"
  })
}

export function selectClassName() {
  return request({
    url: "/student/selectClassName",
    method: "post"
  })
}

export function selectByCondition(name,number,myClass) {
  return request({
    url: "/student/selectByCondition",
    method: "post",
    data: {
      name: name,
      number: number,
      myClass: myClass
    }
  })
}

export function addData(name,number,sex,birthday,myClass) {
  return request( {
    url: "/student/add",
    method: "post",
    data: {
      name: name,
      number: number,
      sex: sex,
      birthday: birthday,
      myClass: myClass,

    }
  })
}

export function deleteData(id) {
  return request( {
    url: "/student/delete",
    method: "post",
    data: {
      id: id
    }
  })
}

export function batchDeleteData(id) {
  return request( {
    url: "/student/batchDelete",
    method: "post",
    data: {
      id: id
    }
  })
}


export function updateData(id,name,number,sex,birthday,myClass) {
  return request( {
    url: "/student/update",
    method: "post",
    data: {
      id: id,
      name: name,
      number: number,
      sex: sex,
      birthday: birthday,
      myClass: myClass,
    }
  })
}