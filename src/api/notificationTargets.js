import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export async function getNotificationTargets() {
  const response = await axios.get(`${host}:${port}/notification_targets`);
  return response.data;
}

export async function deleteNotificationTarget(id) {
  return id;
}

export async function postNotificationTarget(notificationTarget) {
  return 5;
}

export async function patchNotificationTarget(notificationTarget) {
  return notificationTarget;
}
