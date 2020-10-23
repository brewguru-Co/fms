import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

export async function getMaterials() {
  const response = await axios.get(`${host}:${port}/materials`);
  // const response = await axios.get(`http://localhost:5000/materials`);
  return response.data;
}

export async function postMaterial(materials) {
  // const response = await axios.post(`http://localhost:5000/materials`, materials);
  const response = await axios.post(`${host}:${port}/materials`, materials);
  return response.data.batchId;
}

export async function deleteMaterial(id) {
  return id;
}

export async function patchMaterial(tea) {
  return tea;
}
