import axios from 'axios';

export const signUp = (data) => axios.post('/auth/signup', data);
export const login = (data) => axios.post('/auth/login', data);
export const checkStatus = () => axios.get('/auth/check');
