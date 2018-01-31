import request from '../utils/request';

export async function queryDistrictVisitors(payload) {
  return request('/api/ng_event/districts');
}
