import React, {Component} from 'react';
import * as d3 from 'd3';
import ReactSVG from 'react-svg';

import styles from './GenderBar.less';

class GenderBar extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {
    this.width = 160;
    this.height = 50;
    this.scale = d3.scale.linear().domain([0, 1]).range([0, this.width]);
}

  render() {

    const { data, gender, colors, title } = this.props;
    const safePercent = (a, b) => d3.format('.01%')(b ? (a/b) : 0);
    return (
        <div className={styles.genderbar}>

              <div style={{"float" : "left"}}>
                {
                  (gender === 'm') ? <ReactSVG path={require(`../../../../assets/svg/ic-man.svg`)} /> : <ReactSVG path={require(`../../../../assets/svg/ic-woman.svg`)} />
                }
              </div>

              <svg width={this.width} height={this.height} transform="translate(5, 0)">

                {/*total label*/}
                <g transform="translate(0, 14)">
                  <text x={0} y={0} fontSize="10"> {data[gender]} </text>
                </g>

                <g transform="translate(115, 15)">
                  <text className="percentage" x={0} y={0} fontSize="16"> {safePercent(data[gender], data.total)} </text>
                </g>

                <g transform="translate(0, 20)">
                  <rect  fill={"#E6E6E6"} x={0} y={0} width={this.scale(1)} height={(10)}/>
                  <rect  fill={colors(title)} x={0} y={0} width={data.total ? this.scale((data[gender]/data.total)) : 0} height={(10)}/>
                </g>

              </svg>

        </div>
    );
  }
}

export default GenderBar;
