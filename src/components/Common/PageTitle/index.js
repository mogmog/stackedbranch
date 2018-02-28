import React, { PureComponent } from 'react';
import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';
import PrintMenu from '../../../components/Common/Printing/PrintMenu';

import moment from 'moment';

import styles from './index.less';

class PageTitle extends PureComponent {
  render() {
    const { category, title, description, categoryIcon } = this.props;
    return (
      <div className={styles.pageBar}>
        <div className={styles.pageLogoContainer}>
          <div
            className={[styles.pageLogo, styles[categoryIcon]].join(' ')}
          />
        </div>
        <div className={styles.pageTitle}>
          {category.length ? (<span className={styles.category}>{category}:</span>) : (<span />)}

          {title}
        </div>
        <div className={styles.pullRight}>
          <CalendarSideBar
            range={[moment('2018/03/01'), moment('2018/03/07')]}
          />
        </div>
        <small className={styles.pageDescription}>
          {description}
        </small>

        <div style={{ height: '60px', right: '90px', top: '89px', zIndex: 999, position: 'absolute' }} >
          <PrintMenu />
        </div>

      </div>
    );
  }
}
export default PageTitle;
