export const Authorization = () => {
  const ls = localStorage.getItem('authDc');
};

export const isLoggedIn = () => {
  const ls = localStorage.getItem('authDc');
  let storageData = JSON.parse(ls);
  // JSON.parse(ls)
  if (storageData?.token) {
    return true;
  } else {
    return false;
  }
};

export const getToken = () => {
  const ls = localStorage.getItem('authDc');
  let storageData = JSON.parse(ls);
  // JSON.parse(ls)
  return storageData?.token;
};
