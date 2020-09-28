import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getTeaOffsets() {
  const response = await axios.get(`${host}:${port}/tea_offsets`);
  return response.data;
}

export async function postTeaOffset(data) {
  console.log("postTeaOffset ", data);
  return {
    id: data.id,
  };
}

export async function patchTeaOffset(data) {
  console.log("patchTeaOffset ", data);
  return {
    id: data.id,
  };
}

export async function deleteTeaOffset(id) {
  return id;
}
