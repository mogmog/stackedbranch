import { stringify } from 'qs';
import request from '../utils/request';

export async function queryAreas() {
  return request('/api/areas');
}

export async function querySites() {
  return request('/api/sites');
}

export async function querySitesComparison(params) {
  return request('/api/sitescomparison', {
    method: 'POST',
    body: {
      selectedDates: params.selectedDates.map(x => x.toDate()),
      selectedRow  : params.selectedRow.map(x => x.id)
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

