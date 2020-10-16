import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

function toTeaOffsetBody(tank) {
  const { teaId, temp, ph, dox, brix } = tank;
  return {
    teaId,
    temp,
    ph,
    dox,
    brix,
  };
}

export async function getTeaOffsets() {
  // const response = await axios.get(`${host}:${port}/tea-offsets`);
  const response = await axios.get(`http://localhost:5000/tea-offsets`);
  return response.data;
}

export async function postTeaOffset(data) {
  const response = await axios.post(`http://localhost:5000/tea-offsets`, toTeaOffsetBody(data));
  return response.data.id;
}

export async function patchTeaOffset(data) {
  const response = await axios.patch(
    `http://localhost:5000/tea-offsets/${data.id}`,
    toTeaOffsetBody(data),
  );
  return response.data;
}

export async function deleteTeaOffset(id) {
  const response = await axios({
    url: 'http://localhost:5000/tea-offsets',
    method: 'delete',
    data: { id },
  });
  return response.data.id;
}
