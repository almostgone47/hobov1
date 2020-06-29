import jwt from 'jsonwebtoken';

export const getAuthToken = () => {
  let token = localStorage.getItem('hobov_token') || null;

  token =
    token && new window.Date(jwt.decode(token).exp * 1000) > new window.Date()
      ? token
      : null;
  return token;
};

export const getAuthConfig = () => {
  let token = localStorage.getItem('hobov_token') || null;

  token =
    token && new window.Date(jwt.decode(token).exp * 1000) > new window.Date()
      ? token
      : null;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const deleteAuthToken = () => {
  localStorage.removeItem('hobov_token');
};
