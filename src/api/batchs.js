import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getBatchs() {
  const response = await axios.get(`${host}:${port}/batchs`);
  return response.data;
}

export async function postBatch(data) {
  console.log("postBatch ", data);
  return {
    id: data.id,
  };
}

export async function patchBatch(data) {
  console.log("patchBatch ", data);
  return {
    id: data.id,
  };
}
