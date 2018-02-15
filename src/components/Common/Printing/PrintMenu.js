import React, { PureComponent, createElement } from 'react';
import ReactSVG from 'react-svg';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';

import MotionMenu from '../../../ext/react-motion-menu/src';

const printDocument = () => {

  domtoimage.toBlob(document.getElementById('root'))
    .then((blob) => {
      FileSaver.saveAs(blob, 'print.png');
    });
}

export default () => (
  <MotionMenu
    type="horizontal"
    reverse={true}
    margin={60}
  >
    <div>
      <ReactSVG path={require('../../../assets/svg/plus-blue-button.svg')}/>
    </div>

    <div onClick={printDocument} style={{'marginTop': '5px'}}>
      <ReactSVG path={require('../../../assets/svg/share-button.svg')}/>
    </div>

    <div onClick={printDocument} style={{'marginTop': '5px'}}>
      <ReactSVG path={require('../../../assets/svg/screen-shot-button.svg')}/>
    </div>

  </MotionMenu>
);

