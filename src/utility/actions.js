import axios from 'axios';
import toastr from '../utility/Toaster';
import { getToken } from './Authorization';

const requestLoginCall = async reqObject => {
  try {
    let result = await axios(reqObject);
    let { data, status } = result;
    if (status === 200) {
      localStorage.setItem('authDc', JSON.stringify(data));
      return true;
    } else {
      toastr.error('Invalid Username Or Password');
    }
  } catch (error) {
    toastr.error('Invalid Username Or Password');
    return false;
  }
};

const requestCall = async reqObject => {
  try {
    let result = await axios(reqObject);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const AuthLogin = ({ user_id, password }) => {
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/login',
    data: {
      user_id,
      password
    }
  };
  return requestLoginCall(reqObject);
};

export const getUserData = () => {
  let localData = localStorage.getItem('authDc');
  localData = JSON.parse(localData);
  let { userData = '' } = localData;
  return userData;
};

export const getEmployees = async ({ user_id = '', page = 1 }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/employee',
    headers: { Authorization: token },
    data: { user_id, page, size: 2 }
  };
  return await requestCall(reqObject);
};

export const getAllUsers = async () => {
  const token = getToken();
  let reqObject = {
    method: 'get',
    url: 'http://localhost:3636/api/v1/employee',
    headers: { Authorization: token }
  };
  return await requestCall(reqObject);
};
export const addCategory = async ({ ...categoryObject }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/category',
    headers: { Authorization: token },
    data: { ...categoryObject }
  };
  return await requestCall(reqObject);
};

export const addCategoryItem = async ({ ...categoryItemObject }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/category/item',
    headers: { Authorization: token },
    data: { ...categoryItemObject }
  };
  return await requestCall(reqObject);
};

export const getCategories = async () => {
  const token = getToken();
  let reqObject = {
    method: 'get',
    url: 'http://localhost:3636/api/v1/category',
    headers: { Authorization: token }
  };
  return await requestCall(reqObject);
};

export const getCategoryItems = async categoryId => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/category/getItems',
    headers: { Authorization: token },
    data: { categoryId }
  };
  return await requestCall(reqObject);
};

export const addNewEmployee = async ({ ...userObject }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/employee/add',
    headers: { Authorization: token },
    data: { ...userObject, role_id: 'User' }
  };
  return await requestCall(reqObject);
};

export const addNewKarma = async ({ ...userObject }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/transaction/add',
    headers: { Authorization: token },
    data: { ...userObject }
  };
  return await requestCall(reqObject);
};
export const changePassword = async ({ ...userObject }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/employee/change_password',
    headers: { Authorization: token },
    data: { ...userObject }
  };
  return await requestCall(reqObject);
};

export const getLeaderBoard = async (user_id = '') => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/transaction',
    headers: { Authorization: token },
    data: { user_id }
  };
  return await requestCall(reqObject);
};

export const getUserTransaction = async (user_id = '') => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/transaction/user',
    headers: { Authorization: token },
    data: { user_id }
  };
  return await requestCall(reqObject);
};

export const getLocalUserData = () => {
  let lsUserData = localStorage.getItem('authDc');
  lsUserData = JSON.parse(lsUserData);

  return lsUserData.userData;
};
