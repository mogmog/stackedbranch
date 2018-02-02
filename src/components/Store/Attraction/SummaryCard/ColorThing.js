import React from 'react';
import styles from './ColorThing.less';

const ColorThing = ({children, color='red'}) => {
  return (
    <span >
      <div  style={{'background': color}} className={styles.arrow_box}>{children}
      <div  style={{'border-left-color': color}} className={styles.arrow_box_arrow}/>
      </div>

    </span>

  );
};

export default ColorThing;
