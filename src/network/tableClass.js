import {request} from "./request";

export function select() {
  return request({
    url: "/class/select",
    method: "post"
  })
}

export function selectDepartment() {
  return request({
    url: "/class/selectDepartment",
    method: "post"
  })
}

export function selectByCondition(name,special,department) {
  return request({
    url: "/class/selectByCondition",
    method: "post",
    data: {
      name: name,
      special: special,
      department: department
    }
  })
}

export function addData(name,special,department) {
  return request( {
    url: "/class/add",
    method: "post",
    data: {
      name: name,
      special: special,
      department: department,
    }
  })
}

export function deleteData(id) {
  return request( {
    url: "/class/delete",
    method: "post",
    data: {
      id: id
    }
  })
}

export function batchDeleteData(id) {
  return request( {
    url: "/class/batchDelete",
    method: "post",
    data: {
      id: id
    }
  })
}


export function updateData(id,name,special,department) {
  return request( {
    url: "/class/update",
    method: "post",
    data: {
      id: id,
      name: name,
      special: special,
      department: department,
    }
  })
}