import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export const getTanks = async () => {
  const response = await axios.get(`${host}:${port}/tanks`);
  return response.data;
};

export const removeTank = (id) => {
  return id;
};

export const createTank = (tank) => {
  return 2;
};

export const updateTank = (tank) => {
  return tank;
};
