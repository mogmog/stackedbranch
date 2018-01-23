import React, {Component} from 'react';
import * as d3 from 'd3';
import styles from './DateBars.less';

class DateBars extends Component {

  render() {
    const { dates, xScale } = this.props;
    return (
      <g>
        {dates.map((date, i) =>
          (
            <g className={styles.datebars} key={i}>
              <rect x={xScale(new Date(date.from))} y={0} width={xScale(new Date(date.to)) - xScale(new Date(date.from)) } height={380} />
              <text x={xScale(new Date(date.from))} y="400">
                {date.name}
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
