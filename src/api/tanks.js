import axios from 'axios';
import config from '../config.json';

const env = process.env.NODE_ENV || 'development';
const { host, port } = config[env].api;

function toTankBody(tank) {
  const {
    name,
    teaId,
    tempHigh,
    tempLow,
    phHigh,
    phLow,
    doxHigh,
    doxLow,
    brixHigh,
    brixLow,
  } = tank;
  return {
    name,
    teaId,
    tempHigh,
    tempLow,
    phHigh,
    phLow,
    doxHigh,
    doxLow,
    brixHigh,
    brixLow,
  };
}

export async function getTanks() {
  const response = await axios.get(`${host}:${port}/tanks`);
  // const response = await axios.get(`http://localhost:5000/tanks`);
  return response.data;
}

export async function deleteTank(id) {
  const response = await axios({
    url: `${host}:${port}/tanks`,
    // url: 'http://localhost:5000/tanks',
    method: 'delete',
    data: { id },
  });
  return response.data.id;
}

export async function postTank(tank) {
  const response = await axios.post(`${host}:${port}/tanks`, toTankBody(tank));
  // const response = await axios.post(`http://localhost:5000/tanks`, toTankBody(tank));
  return response.data.id;
}

export async function patchTank(tank) {
  const response = await axios.patch(`${host}:${port}/tanks/${tank.id}`, toTankBody(tank));
  // const response = await axios.patch(`http://localhost:5000/tanks/${tank.id}`, toTankBody(tank));
  return response.data;
}
