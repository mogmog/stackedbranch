import React, { PureComponent } from 'react';
import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';

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
          <CalendarSideBar />
        </div>
        <small className={styles.pageDescription}>
          {description}
        </small>
      </div>
    );
  }
}
export default PageTitle;
