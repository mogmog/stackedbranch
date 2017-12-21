import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Card, Select } from 'antd';

const Option = Select.Option;

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class SmallCellList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'site_namespace/fetch',
    });

    dispatch({
      type: 'smallcell_namespace/fetch',
    });


  }

  handleChange(id, site_id) {
    const { dispatch } = this.props;

    dispatch({
      type: 'smallcell_namespace/saveandfetch',
      payload: { id, site_id },
    });
  }

  render() {

    const { smallcells, loading, sites } = this.props; //the things wired up in the onnect props to state

    const columns = [

      {
        title: 'ID',
        defaultSortOrder: 'ascend',
        dataIndex: 'id',
      },

      {
        title : 'Site',
        render : (x) =>{
          return (
            <Select defaultValue={ x.site_id }
                    style={{ width: 220 }}
                    onChange={ (site_id) => { this.handleChange.bind(this)(x.id, site_id); } } >
              {sites.list.map((site) => <Option key={site.id} value={site.id}>{site.name}</Option>)}
            </Select>
          );
        },
      },

    ];


    return (

      <span>

        <PageHeaderLayout>

          <Card bordered={false}>
            <div>

               <Table
                 rowKey={x => x.id}
                 loading={loading}
                 dataSource={smallcells.list}
                 columns={columns}
                 pagination={false}
               />
            </div>
          </Card>

        </PageHeaderLayout>
      </span>
    );
  }
}

//state to props
export default connect((state) => {

  console.log(state);
  return {
    loading:    state.smallcell_namespace.loading,
    smallcells: state.smallcell_namespace.smallcells,
    sites:      state.site_namespace.sites,
  }
})(SmallCellList);
