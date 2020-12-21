import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

export const signUp = (data) => axios.post(`${host}:${port}/auth/signup`, data);
export const login = (data) => axios.post(`${host}:${port}/auth/login`, data);
export const checkStatus = () => axios.get(`${host}:${port}/auth/check`);
