import {request} from "./request";

export function select() {
  return request({
    url: "/course/select",
    method: "post"
  })
}

export function selectStatus() {
  return request({
    url: "/course/selectStatus",
    method: "post"
  })
}

export function selectByCondition(name,description,status) {
  return request({
    url: "/course/selectByCondition",
    method: "post",
    data: {
      name: name,
      description: description,
      status: status
    }
  })
}

export function addData(name,create,description,status) {
  return request( {
    url: "/course/add",
    method: "post",
    data: {
      name: name,
      create: create,
      description: description,
      status: status
    }
  })
}

export function deleteData(id) {
  return request( {
    url: "/course/delete",
    method: "post",
    data: {
      id: id
    }
  })
}

export function batchDeleteData(id) {
  return request( {
    url: "/course/batchDelete",
    method: "post",
    data: {
      id: id
    }
  })
}


export function updateData(id,name,create,description,status) {
  return request( {
    url: "/course/update",
    method: "post",
    data: {
      id: id,
      name: name,
      create: create,
      description: description,
      status: status
    }
  })
}