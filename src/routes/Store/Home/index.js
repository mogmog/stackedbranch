import React, { PureComponent } from 'react';
import { connect } from 'dva';

import SideMenu from '../../../components/Common/SideMenu';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import PageTitle from '../../../components/Common/PageTitle';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const pageTitleInfo = {
      category: 'Home',
      title: 'Welcome, Carolina',
      description:
        'Something something',
      categoryIcon: 'icFunnel',
    };

    return (
      <div>
        <PageTitle
          category={pageTitleInfo.category}
          title={pageTitleInfo.title}
          description={pageTitleInfo.description}
          categoryIcon={pageTitleInfo.categoryIcon}
        />

        <SideMenu />

        <PageHeaderLayout
          top={null}
          content={null}
          style={null}
        >
            Hello
        </PageHeaderLayout>
      </div>
    );
  }
}
