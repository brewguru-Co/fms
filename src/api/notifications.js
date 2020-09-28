import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getNotifications() {
  const response = await axios.get(`${host}:${port}/notifications`);
  return response.data;
}
