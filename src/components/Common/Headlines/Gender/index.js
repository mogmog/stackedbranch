import React, {PureComponent, createElement} from 'react';
import ReactSVG from 'react-svg';
import {Row, Col} from 'antd';

export default (props) => {

  const Man = x => <ReactSVG path={require(`../../../../assets/svg/ic-man.svg`)}/>;
  const Woman = x => <ReactSVG path={require(`../../../../assets/svg/ic-woman.svg`)}/>;

  return (
    <Row>

      <Col span={12}>
        {
          (props.gender === "m") ? (<Man></Man>) : (<Woman></Woman>)
        }
      </Col>

      <Col span={12}>
        <h2>{props.headline}</h2>
      </Col>
    </Row>
  );
};

