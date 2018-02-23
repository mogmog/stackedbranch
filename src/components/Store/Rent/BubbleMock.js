import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';
import styles from './BubbleMock.less';
import BubbleTooltip from './BubbleTooltip';
import GenderHeadline from './../../../components/Common/Headlines/Gender';

class BubbleMock extends Component {
  constructor(props) {
    super();
  }

  state = {
    selectedTooltip: null,
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  setTooltip(data, rent) {
    this.setState({ selectedTooltip: [(this.props.gender === 'm' ? 'Male' : 'Female'), data.values, this.props.type, data.key] });
  }

  render() {
    const { width, height, gender, type, data, headline, largest } = this.props;

    return (

      <div>


        <div style={{ width: '100px' }}>
          <GenderHeadline gender={gender} headline={d3.format('.01%')(headline)} />
        </div>

        <ReactTooltip border id="getContent" className={styles.customTooltip}>
          {(this.state.selectedTooltip) ? (<BubbleTooltip lines={this.state.selectedTooltip} />) : (null)}
        </ReactTooltip>

        <svg height={height} width={width} viewBox="0 0 660 480" className={styles.bubblemock}>
          <g data-name="labels" transform="scale(1 1)">
            <text className={styles.yAxisLabel} transform="translate(125 20)">RENT</text>
            <g transform="translate(125 70)">
              <text className={[styles.axisTickLabel, styles.yAxisTickLabel].join(' ')} transform="translate(0 0)">HIGH</text>
              <text className={[styles.axisTickLabel, styles.yAxisTickLabel].join(' ')} transform="translate(0 100)">MEDIUM-HIGH</text>
              <text className={[styles.axisTickLabel, styles.yAxisTickLabel].join(' ')} transform="translate(0 200)">MEDIUM</text>
              <text className={[styles.axisTickLabel, styles.yAxisTickLabel].join(' ')} transform="translate(0 300)">LOW</text>
            </g>
            <text className={styles.xAxisLabel} transform="translate(640 460)">AGE</text>
            <g transform="translate(190 445)">
              <text className={[styles.axisTickLabel, styles.xAxisTickLabel].join(' ')} transform="translate(0 0)">18-29</text>
              <text className={[styles.axisTickLabel, styles.xAxisTickLabel].join(' ')} transform="translate(100 0)">30-39</text>
              <text className={[styles.axisTickLabel, styles.xAxisTickLabel].join(' ')} transform="translate(200 0)">40-49</text>
              <text className={[styles.axisTickLabel, styles.xAxisTickLabel].join(' ')} transform="translate(300 0)">50-59</text>
              <text className={[styles.axisTickLabel, styles.xAxisTickLabel].join(' ')} transform="translate(400 0)">60-69</text>
            </g>
          </g>
          <g data-name="grid" transform="translate(140 20)">
            <g data-name="pane">
              <rect x="0" y="0" width="500" height="400" />
            </g>
            <g data-name="pane">
              <line className={styles.gridLine} x1="0" y1="050" x2="500" y2="050" />
              <line className={styles.gridLine} x1="0" y1="150" x2="500" y2="150" />
              <line className={styles.gridLine} x1="0" y1="250" x2="500" y2="250" />
              <line className={styles.gridLine} x1="0" y1="350" x2="500" y2="350" />
            </g>
            <g data-name="pane">
              <line className={styles.gridLine} x1="050" y1="0" x2="050" y2="400" />
              <line className={styles.gridLine} x1="150" y1="0" x2="150" y2="400" />
              <line className={styles.gridLine} x1="250" y1="0" x2="250" y2="400" />
              <line className={styles.gridLine} x1="350" y1="0" x2="350" y2="400" />
              <line className={styles.gridLine} x1="450" y1="0" x2="450" y2="400" />
            </g>
          </g>

          <g data-name="bubbles" transform="translate(190 70)">

            {
              data.values.map((d, i) =>
                (
                  <g key={i}>

                    {
                      d.values.map((e, j) =>
                        (
                          <g key={j}>
                            <circle className={styles.bubble} fill={gender === 'm' ? '#F05CB0' : '#FF73FF'} onMouseEnter={(() => { this.setTooltip(e, d); })} data-tip="" data-for="getContent" cx={i * 100} cy={j * 100} r={40 * Math.pow(e.values / largest, 0.75)} />
                          </g>
                        )
                      )
                    }

                  </g>
                )
              )
            }
          </g>
        </svg>
      </div>


    );
  }
}

export default BubbleMock;

BubbleMock.defaultProps = {
  width: 660,
  height: 480,
  scale: 2,
};
