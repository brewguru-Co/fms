import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getTanks() {
  const response = await axios.get(`${host}:${port}/tanks`);
  return response.data;
}

export async function deleteTank(id) {
  return id;
}

export async function postTank(tank) {
  return 2;
}

export async function patchTank(tank) {
  return tank;
}
