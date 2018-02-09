import request from '../utils/request';

export async function queryDistrictVisitors(payload) {
  return request('/api/ng_event/districts');
}

export async function queryDistrictAttractionTotals(payload) {
  return request('/api/ng_event/attractiontotals');
}

export async function queryProfile(payload) {
  return request('/api/ng_event/profiles');
}


export async function queryPurchase(payload) {
  return request(`/api/ng_event/purchase/${payload.home_district_name}/${payload.type_visitor}`);
}


