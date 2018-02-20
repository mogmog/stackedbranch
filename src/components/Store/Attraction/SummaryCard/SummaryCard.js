import React from 'react';
import { Card, Spin } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

const SummaryCard = ({
  loading = false, contentHeight, title, subtitle, avatar, action, total, footer, children, ...rest
}) => {
  const content = (
    <div className={classNames(styles.summaryCard)}>
      <div
        className={classNames(styles.chartTop, { [styles.chartTopMargin]: (!children && !footer) })}
      >
        <div className={styles.avatar} style={{'height':'32px'}}>
          {
            avatar
          }

        </div>
        <div style={{'clear' : 'both'}}>

          <div className={styles.total} dangerouslySetInnerHTML={{ __html: total }} />

          <div className={styles.meta}>
            <span className={styles.title}>{title}</span>
          </div>

          <div className={styles.subtitle}>
            {subtitle}
          </div>

        </div>
      </div>

      {
        footer && (
          <div className={classNames(styles.footer, { [styles.footerMargin]: !children })}>
            {footer}
          </div>
        )
      }
    </div>
  );

  return (
    <Card
      bodyStyle={{ padding: '0px 0px 0px 0px', backgroundColor : 'transparent'}}
      {...rest}
    >
      {content}

    </Card>
  );
};

export default SummaryCard;
