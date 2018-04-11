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
      category: '',
      title: 'Welcome, Charlie',
      description:
        'This is the landing page of the tool. Here you can see your latest KPIs on recent activity',
      categoryIcon: 'icBagStore',
    };

    return (
      <div>
        <SideMenu />

        <PageTitle
          category={pageTitleInfo.category}
          title={pageTitleInfo.title}
          description={pageTitleInfo.description}
          categoryIcon={pageTitleInfo.categoryIcon}
        />

        <PageHeaderLayout
          top={null}
          content={null}
          style={null}
        >
          <img style={{ cursor: 'not-allowed', width: '100%' }} src={require('./../../../assets/screenshots/landing_screen@4x.png')} />
        </PageHeaderLayout>
      </div>
    );
  }
}
