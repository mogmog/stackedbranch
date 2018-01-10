import React, { PureComponent } from 'react';
import {EditControl} from 'react-leaflet-draw';

class AreaDefinitionMapToolbar extends PureComponent {

  render() {

    console.log(this.props);

    return (
      <EditControl
        onCreated={this.props.onAreaDefine}
        ref={_EditControl => this.editcontrol = _EditControl}
        position='topleft'
        draw={{
          polyline : false,
          rectangle: false,
          circle : false,
          circlemarker : false,
          marker : false,
        }}
      />

    );
  }
}

export default AreaDefinitionMapToolbar;
