import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

export async function getTankDatas() {
  const response = await axios.get('/tankDatas');
  return response.data;
}

export async function getTankRealtimeData() {
  const response = await axios.get(`${host}:${port}/tank-datas`);
  // const response = await axios.get('http://localhost:5000/tank-datas');
  return response.data;
}
