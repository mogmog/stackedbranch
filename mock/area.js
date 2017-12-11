import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

tableListDataSource.push({id : 1, name : 'Angel',         'geodata' : {"geometry": {"coordinates": [[[-0.107803, 51.537153], [-0.118446, 51.53096], [-0.109863, 51.524552], [-0.0951, 51.527115], [-0.107803, 51.537153]]], "type": "Polygon"}, "properties": {}, "type": "Feature"}, 'center_lat' : 51.530122108232824, 'center_lng' :  -0.10738169105308559, 'zoom' : 12 });
tableListDataSource.push({id : 2, name : 'Goodge Street', 'geodata' : {"geometry": {"coordinates": [[[-0.134218, 51.519839], [-0.134711, 51.519505], [-0.133338, 51.51801], [-0.132544, 51.518157], [-0.134218, 51.519839]]], "type": "Polygon"}, "properties": {}, "type": "Feature"}, 'center_lat' : 51.530122108232824, 'center_lng' :  -0.10738169105308559, 'zoom' : 12 });

export function getArea(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}



export default {
  getArea,
};
