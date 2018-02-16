import React, {PureComponent} from 'react';
import {Row, Col, Card} from 'antd';
import ReactSVG from 'react-svg';

import DistrictCard from './DistrictCard';
import AgeGenderChart from './../Charts/AgeGenderChart';

export default class DistrictAgeGenderCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const safePercent = (a, b) => d3.format('.01%')(b ? (a / b) : 0);
    const {district, profile, colors} = this.props;
    const groupedbygender = profile.getGroupedByGender(district.properties.name);
    const groupedbygenderandage = profile.getGroupedByGenderAndAge(district.properties.name);

    console.log(groupedbygenderandage);

    return (

      <DistrictCard title={district.properties.name} total={groupedbygender.total} height={260}>

        <Row gutter={24}>

          {groupedbygenderandage.map((d, i) =>

            (
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>

                <Row>
                  <Col>

                    <Row>
                      <Col span={2}>

                        {
                          ((d.key === 'm') ? <ReactSVG path={require(`../../../../assets/svg/ic-man.svg`)}/> :
                            <ReactSVG path={require(`../../../../assets/svg/ic-woman.svg`)}/>)
                        }
                      </Col>

                      <Col span={10}>
                        {groupedbygender[d.key]}
                      </Col>

                      <Col span={2} offset={2}>
                        <h2>{safePercent(groupedbygender[d.key], groupedbygender.total)}</h2>
                      </Col>
                    </Row>
                  </Col>

                </Row>

                <Row>
                  <Col span={24}>
                    <AgeGenderChart values={d.values} district={district} colors={colors} gender={d.key}></AgeGenderChart>
                  </Col>
                </Row>
              </Col>
            )
          )}


        </Row>

      </DistrictCard>

    );
  }
}

