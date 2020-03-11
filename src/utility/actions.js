import axios from 'axios';

const requestCall = async reqObject => {
  try {
    let result = await axios(reqObject);
    let { data } = result;
    localStorage.setItem('authDc', JSON.stringify(data));
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
  requestCall(reqObject);
};
