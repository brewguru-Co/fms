import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getProducts() {
  const response = await axios.get(`${host}:${port}/products`);
  return response.data;
}

export async function postProduct(data) {
  console.log("postProduct ", data);
  return {
    id: data.id,
  };
}

export async function patchProduct(data) {
  console.log("patchProduct ", data);
  return {
    id: data.id,
  };
}
