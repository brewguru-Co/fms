import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getTeas() {
  // const response = await axios.get(`${host}:${port}/teas`);
  const response = await axios.get(`http://localhost:5000/teas`);
  return response.data;
}

export async function deleteTea(id) {
  return id;
}

export async function postTea(tea) {
  return 4;
}

export async function patchTea(tea) {
  return tea;
}
