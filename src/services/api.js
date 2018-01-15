import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAreas() {
  return request('/api/areas');
}

export async function querySites() {
  return request('/api/sites');
}

export async function querySmallcells() {
  return request('/api/smallcells');
}

export async function saveSmallCell(params) {
  return request('/api/smallcells/update', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function querySitesComparison(params) {
  return request('/api/sighting/getgendertotals/', {
    method: 'POST',
    body: {
      selectedDates: params.selectedDates.map(x => x.toDate()),
      site_ids  : params.site_ids.map(x => x.id),
    },
  });
}

export async function saveArea(params) {
  return request('/api/areas/create', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function deleteArea(params) {
console.log(params);
  return request('/api/areas/delete', {
    method: 'POST',
    body: {
      ...params,
      id: params.id,
    },
  });
}

