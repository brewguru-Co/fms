import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

export async function getTeas() {
  const response = await axios.get(`${host}:${port}/teas`);
  // const response = await axios.get(`http://localhost:5000/teas`);
  return response.data;
}

export async function deleteTea(id) {
  const response = await axios({
    url: `${host}:${port}/teas`,
    // url: 'http://localhost:5000/teas',
    method: 'delete',
    data: { id },
  });
  return response.data.id;
}

export async function postTea(tea) {
  const response = await axios.post(`${host}:${port}/teas`, tea);
  // const response = await axios.post(`http://localhost:5000/teas`, tea);
  return response.data.id;
}

export async function patchTea(tea) {
  const {
    id,
    name,
    tempHighOp,
    tempLowOp,
    phHighOp,
    phLowOp,
    doxHighOp,
    doxLowOp,
    brixHighOp,
    brixLowOp,
  } = tea;
  // const response = await axios.patch(`http://localhost:5000/teas/${id}`, {
  const response = await axios.patch(`${host}:${port}/teas/${id}`, {
    name,
    tempHighOp,
    tempLowOp,
    phHighOp,
    phLowOp,
    doxHighOp,
    doxLowOp,
    brixHighOp,
    brixLowOp,
  });
  return response.data;
}
