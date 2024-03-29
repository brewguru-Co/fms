import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

export async function getBatchDatas() {
  const response = await axios.get(`${host}:${port}/batch-data`);
  // const response = await axios.get(`http://localhost:5000/batch-data`);
  return response.data;
}
