import axios from 'axios';
import * as Keychain from 'react-native-keychain';
const api = axios.create({
  baseURL: 'https://aapsuj.accevate.co',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use(async config => {
  const token = await Keychain.getGenericPassword();
  console.log(token, 'token');
  if (token) config.headers.Authorization = `Bearer ${token?.password}`;
  return config;
});

export default api;
