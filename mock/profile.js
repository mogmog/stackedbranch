const basicGoods = [
  {
    id: '1234561',
    name: 'Elephant',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: 'Dog',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: 'Cat',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: 'Fish',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: 'processing',
    status: 'processing',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: 'success',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '1h',
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: 'success5mins',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: 'success1h',
    status: 'success',
    operator: '系统',
    cost: '1h',
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: 'success5mins',
    status: 'success',
    operator: '用户',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: 'thing',
    name: 'agree',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'other',
    name: 'reject',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: 'item',
    name: 'agree',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: 'yyy',
    name: 'agree',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: 'xxxx',
    name: 'agree',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: 'thing',
    name: 'name',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: 'xxxx',
    name: 'name2',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

export const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

export const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  getProfileBasicData,
  getProfileAdvancedData,
};
