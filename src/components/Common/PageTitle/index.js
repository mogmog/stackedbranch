import React, { PureComponent } from 'react';
import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';
import moment from "moment";

import styles from './index.less';

class PageTitle extends PureComponent {
  render() {
    const { category, title, description } = this.props;
    return (
      <div className={styles.pageBar}>
        <div className={styles.pageLogoContainer}>
          <div className={styles.pageLogo} />
        </div>
        <div className={styles.pageTitle}>
          <span className={styles.category}>{category}:</span> {title}
        </div>
        <div className={styles.pullRight}>
          <CalendarSideBar
            range={[moment("2018/03/01"), moment("2018/03/07")]}
          />        </div>
        <small className={styles.pageDescription}>
          {description}
        </small>
      </div>
    );
  }
}
export default PageTitle;
