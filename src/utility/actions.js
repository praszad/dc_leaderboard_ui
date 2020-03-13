import axios from 'axios';
import toastr from '../utility/Toaster';
import { getToken } from './Authorization';

const requestLoginCall = async reqObject => {
  try {
    let result = await axios(reqObject);
    let { data, status } = result;
    console.log(result);

    if (status === 200) {
      localStorage.setItem('authDc', JSON.stringify(data));
      return true;
    } else {
      return false;
      toastr.error('Invalid Username Or Password');
    }
  } catch (error) {
    toastr.error('Invalid Username Or Password');
    console.log(error);
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

export const getEmployees = async ({ user_id = '', page = 1 }) => {
  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/employee',
    headers: { Authorization: token },
    data: { user_id, page }
  };
  return await requestCall(reqObject);
};

export const addNewEmployee = async ({ ...userObject }) => {
  console.log({ ...userObject });

  const token = getToken();
  let reqObject = {
    method: 'post',
    url: 'http://localhost:3636/api/v1/employee/add',
    headers: { Authorization: token },
    data: { ...userObject, role_id: 'User' }
  };
  return await requestCall(reqObject);
};
