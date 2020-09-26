import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export const getNotificationTargets = async () => {
  const response = await axios.get(`${host}:${port}/notification_targets`);
  return response.data;
};

export const removeNotificationTarget = (id) => {
  return id;
};

export const createNotificationTarget = (notificationTarget) => {
  return 5;
};

export const updateNotificationTarget = (notificationTarget) => {
  return notificationTarget;
};
