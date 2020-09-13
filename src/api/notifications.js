import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export const getNotifications = async () => {
  const response = await axios.get(`${host}:${port}/notifications`);
  return response.data;
};

export const removeNotification = (id) => {
  return id;
};

export const createNotification = (notification) => {
  return 5;
};

export const updateNotification = (notification) => {
  return notification;
};
