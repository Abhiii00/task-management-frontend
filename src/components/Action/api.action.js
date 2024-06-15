import {
  getRequest,
  postRequest,
  postRequestFormData,
  putRequest,
  // putRequest,
   deleteRequest,
  // postRequestFormData,
} from "../../utils/serverApi";

export const userRegistration = (data) => {
  return postRequest("userRegistration", data).then((res) => {
    return res.data;
  });
};

export const loginUser = (data) => {
  return postRequest("loginUser", data).then((res) => {
    return res.data;
  });
};

export const createTask = (data) => {
  return postRequest("createTask", data).then((res) => {
    return res.data;
  });
};

export const getTaskList = (data) => {
  return getRequest("getTaskList", data).then((res) => {
    return res.data;
  });
};

export const getTaskListByUserId = (data) => {
  return getRequest("getTaskListByUserId", data).then((res) => {
    return res.data;
  });
};

export const updateTask = (data) => {
  return putRequest("updateTask", data).then((res) => {
    return res.data;
  });
};
export const updateTaskStatus = (data) => {
  return putRequest("updateTaskStatus", data).then((res) => {
    return res.data;
  });
};
export const deleteTask = (data) => {
  return deleteRequest("deleteTask", data).then((res) => {
    return res.data;
  });
};


export const getUserList = (data) => {
  return getRequest("getUserList", data).then((res) => {
    return res.data;
  });
};

