import React, { PureComponent } from 'react';
import { Table, Card, Select } from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import CellSelectMap from '../../../components/CellSelect/CellSelectMap';

class CellSelect extends PureComponent {

  componentDidMount() {
  }

  render() {

    return (

      <span>

        <PageHeaderLayout>

          <Card bordered={false}>
           <CellSelectMap></CellSelectMap>
          </Card>

        </PageHeaderLayout>
      </span>
    );
  }
}

export default CellSelect;
