import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getMaterials() {
  const response = await axios.get(`${host}:${port}/materials`);
  return response.data;
}

export async function deleteMaterial(id) {
  return id;
}

export async function postMaterial(tea) {
  return 4;
}

export async function patchMaterial(tea) {
  return tea;
}
