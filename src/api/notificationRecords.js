import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export const getNotificationRecords = async () => {
  const response = await axios.get(`${host}:${port}/notification_records`);
  return response.data;
};
