import React from 'react';
import { Button } from 'antd';
import styles from './LucaButton.less';

export default function LucaButton(props) {
  return (
    <div className={styles.container}>
      <Button {...props} >
        {props.children}
      </Button>
    </div>
  );
}

