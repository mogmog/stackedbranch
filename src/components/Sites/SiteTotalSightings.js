import React, { PureComponent } from 'react';
import _ from 'lodash';

class SiteTotalSightings extends PureComponent {

  render() {

    const total = _(this.props.data).sumBy('count');

    return (
      <h1>
        {total} total sightings
      </h1>
    );
  }
}

export default SiteTotalSightings;
