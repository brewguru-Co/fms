import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

export async function getNotificationTargets() {
  const response = await axios.get(`${host}:${port}/notification-targets`);
  // const response = await axios.get(`http://localhost:5000/notification-targets`);
  return response.data;
}

export async function deleteNotificationTarget(id) {
  const response = await axios({
    url: `${host}:${port}/notification-targets`,
    // url: 'http://localhost:5000/notification-targets',
    method: 'delete',
    data: { id },
  });
  return response.data.id;
}

export async function postNotificationTarget(notificationTarget) {
  const response = await axios.post(
    // `http://localhost:5000/notification-targets`,
    `${host}:${port}/notification-targets`,
    notificationTarget,
  );
  return response.data.id;
}

export async function patchNotificationTarget(notificationTarget) {
  const { id, name, email, phone, on } = notificationTarget;
  // const response = await axios.patch(`http://localhost:5000/notification-targets/${id}`, {
  const response = await axios.patch(`${host}:${port}/notification-targets/${id}`, {
    name,
    email,
    phone,
    on,
  });
  return response.data;
}
