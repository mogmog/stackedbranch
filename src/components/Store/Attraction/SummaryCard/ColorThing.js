import React from 'react';
import styles from './ColorThing.less';

const ColorThing = ({children, color='red', text}) => {
  return (
    <span >
      <div  style={{'background': color, 'color' : text}} className={styles.arrow_box}>{children}
      <div  style={{'borderLeftColor': color}} className={styles.arrow_box_arrow}/>
      </div>

    </span>

  );
};

export default ColorThing;
