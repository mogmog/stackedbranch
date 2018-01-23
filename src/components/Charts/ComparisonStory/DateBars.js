import React, {Component} from 'react';
import * as d3 from 'd3';
import styles from './DateBars.less';

class DateBars extends Component {

  render() {
    let { dates, xScale } = this.props;

    return (
      <g>
        {dates.map((date, i) =>
          (
            <g className={styles.datebars} key={i}>
              <rect x={xScale(date.from)} y={0} width={70} height={480} />
              <text x={xScale(date.from)} y="500">
                {date.text}
              </text>
            </g>
          )
        )
        }
      </g>
    );
  }
}

export default DateBars;