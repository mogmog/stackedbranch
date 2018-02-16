import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import {  Button } from 'antd';
import styles from './sidebar.less';


class BattlegroundSideBar extends Component {

  constructor(props) {
    super();
  }

  componentWillMount () {

  }

  render() {

    const { children, open } = this.props;

    return (

      <div>

        <Motion style={{tween: spring(open ? 0 : 100)}}>
          {
            ({tween}) => (

              <div className={styles.sidebar} style={{'transform': `translateX(${tween}%)` }}>
                {children}
              </div>
            )}
        </Motion>

      </div>
    );
  }

}

export default BattlegroundSideBar;
