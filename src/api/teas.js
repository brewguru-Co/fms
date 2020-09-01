import axios from "axios";
import config from "../config.json";

const env = process.env.NODE_ENV || "development";
const { host, port } = config[env].api;

export const getTeas = async () => {
  const response = await axios.get(`${host}:${port}/teas`);
  return response.data;
};

export const removeTea = (id) => {
  console.log("removeTea ", id);
  return id;
};

export const createTea = () => {
  console.log("createTea ");
  return;
};

export const updateTea = (tea) => {
  console.log("updateTea ", tea);
  return tea;
};
