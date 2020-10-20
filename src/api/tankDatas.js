import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

export async function getTankDatas() {
  const response = await axios.get('/tankDatas');
  return response.data;
}

function createRandomValue(from, to, float = false) {
  return _.random(from, to, float);
}

export async function getTankRealtimeData() {
  const response = await axios.get('http://localhost:5000/tank-datas');
  return response.data;
  // return {
  //   name: "tank1",
  //   temp: parseFloat(createRandomValue(28, 30, true).toFixed(1)),
  //   ph: parseFloat(createRandomValue(3.2, 3.6, true).toFixed(2)),
  //   dox: createRandomValue(40, 50),
  //   brix: createRandomValue(0.2, 0.8, true).toFixed(1),
  //   createdAt: moment().unix(),
  // };
}
