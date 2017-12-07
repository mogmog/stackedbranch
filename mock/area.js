import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

tableListDataSource.push({id : 1, name : 'Beak Street', size : 1.2, coords : [[{"lat":51.52616326077225,"lng":-0.08830239755483361},{"lat":51.52359997992331,"lng":-0.09911706430288049},{"lat":51.52060930322446,"lng":-0.09705712777944298},{"lat":51.51740478880791,"lng":-0.08898904306264611},{"lat":51.517938890201805,"lng":-0.08521249276967735}]]});

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
