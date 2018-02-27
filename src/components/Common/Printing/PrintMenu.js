import React, { PureComponent } from 'react';
import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';
import styles from './PrintMenu.less';
import MotionMenu from '../../../ext/react-motion-menu/src';

class PrintMenu extends PureComponent {
  state = { open: false };

  printDocument() {
    domtoimage.toBlob(document.getElementById('root'))
      .then((blob) => {
        FileSaver.saveAs(blob, 'print.png');
      });
  }

  render() {
    const OpenSVG = () => (<svg height="58px" width="70px" viewBox="0 0 70 58" className={styles.svgShadow}>
      <title>button</title>
      <g id="OVERVIEW:-attraction-power">
        <path
          className={styles.svgShadow}
          id="path-1"
          fill="#29A5E9"
          d="M61.5,8.5L61.5,8.5C50.2-2.8,32-2.8,20.6,8.5L0.1,29l20.5,20.5c11.3,11.3,29.6,11.3,40.9,0l0,0
        C72.8,38.2,72.8,19.8,61.5,8.5z"
        />
        <polygon
          id="_x2B_"
          fill="#FFFFFF"
          points="34.9,21.7 33.6,23 39.7,29.1 33.7,35.1 34.9,36.3 40.9,30.3 47.1,36.4 48.3,35.2 42.1,29
        48.3,22.8 47.1,21.6 40.9,27.8"
        />
      </g>
    </svg>);

    const CloseSVG = () => (<svg width="70px" height="58px" viewBox="0 0 70 58" className={styles.svgShadow}>
      <title>button</title>
      <g id="OVERVIEW:-attraction-power">
        <path
          id="path-1"
          fill="#FFFFFF"
          d="M61.5,8.5L61.5,8.5C50.2-2.8,32-2.8,20.6,8.5L0.1,29l20.5,20.5c11.3,11.3,29.6,11.3,40.9,0l0,0
        C72.8,38.2,72.8,19.8,61.5,8.5z"
        />
        <polygon
          id="_x2B_"
          fill="#29A5E9"
          points="41.9,19.5 40,19.5 40,28.2 31.5,28.2 31.5,29.8 40,29.8 40.1,38.5 41.9,38.5 41.9,29.8
        50.5,29.8 50.5,28.2 41.9,28.2"
        />
      </g>
    </svg>);
    const ShareSVG = () => (<svg width="70px" height="58px" viewBox="0 0 70 58" className={styles.svgShadow}>
      <title>button</title>
      <g id="OVERVIEW:-attraction-power">
        <path
          id="path-1"
          fill="#FFFFFF"
          d="M61.5,8.5L61.5,8.5C50.2-2.8,32-2.8,20.6,8.5L0.1,29l20.5,20.5c11.3,11.3,29.6,11.3,40.9,0l0,0
        C72.8,38.2,72.8,19.8,61.5,8.5z"
        />
        <polygon
          id="_x2B_"
          fill="#29A5E9"
          points="41.9,19.5 40,19.5 40,28.2 31.5,28.2 31.5,29.8 40,29.8 40.1,38.5 41.9,38.5 41.9,29.8
        50.5,29.8 50.5,28.2 41.9,28.2"
        />
      </g>
    </svg>);
    const PrintSVG = () => (<svg width="70px" height="58px" viewBox="0 0 70 58" className={styles.svgShadow}>
      <title>button</title>
      <g id="OVERVIEW:-attraction-power">
        <path
          id="path-1"
          fill="#FFFFFF"
          d="M61.5,8.5L61.5,8.5C50.2-2.8,32-2.8,20.6,8.5L0.1,29l20.5,20.5c11.3,11.3,29.6,11.3,40.9,0l0,0
        C72.8,38.2,72.8,19.8,61.5,8.5z"
        />
        <polygon
          id="_x2B_"
          fill="#29A5E9"
          points="41.9,19.5 40,19.5 40,28.2 31.5,28.2 31.5,29.8 40,29.8 40.1,38.5 41.9,38.5 41.9,29.8
        50.5,29.8 50.5,28.2 41.9,28.2"
        />
      </g>
    </svg>);
    const PdfSVG = () => (<svg width="70px" height="58px" viewBox="0 0 70 58" className={styles.svgShadow}>
      <title>button</title>
      <g id="OVERVIEW:-attraction-power">
        <path
          id="path-1"
          fill="#FFFFFF"
          d="M61.5,8.5L61.5,8.5C50.2-2.8,32-2.8,20.6,8.5L0.1,29l20.5,20.5c11.3,11.3,29.6,11.3,40.9,0l0,0
        C72.8,38.2,72.8,19.8,61.5,8.5z"
        />
        <polygon
          id="_x2B_"
          fill="#29A5E9"
          points="41.9,19.5 40,19.5 40,28.2 31.5,28.2 31.5,29.8 40,29.8 40.1,38.5 41.9,38.5 41.9,29.8
        50.5,29.8 50.5,28.2 41.9,28.2"
        />
      </g>
    </svg>);
    const HelpSVG = () => (<svg width="70px" height="58px" viewBox="0 0 70 58" className={styles.svgShadow}>
      <title>button</title>
      <g id="OVERVIEW:-attraction-power">
        <path
          id="path-1"
          fill="#FFFFFF"
          d="M61.5,8.5L61.5,8.5C50.2-2.8,32-2.8,20.6,8.5L0.1,29l20.5,20.5c11.3,11.3,29.6,11.3,40.9,0l0,0
        C72.8,38.2,72.8,19.8,61.5,8.5z"
        />
        <polygon
          id="_x2B_"
          fill="#29A5E9"
          points="41.9,19.5 40,19.5 40,28.2 31.5,28.2 31.5,29.8 40,29.8 40.1,38.5 41.9,38.5 41.9,29.8
        50.5,29.8 50.5,28.2 41.9,28.2"
        />
      </g>
    </svg>);

    return (<MotionMenu
      onOpen={() => { this.setState({ open: true }); }}
      onClose={() => { this.setState({ open: false }); }}
      type="horizontal"
      reverse
      margin={60}
    >
      <div>
        {this.state.open ? <OpenSVG /> : <CloseSVG />}
      </div>
      <div>
        <ShareSVG />
      </div>
      <div onClick={this.printDocument.bind(this)}>
        <PrintSVG />
      </div>
      <div>
        <PdfSVG />
      </div>
      <div>
        <HelpSVG />
      </div>
    </MotionMenu>);
  }
}

export default PrintMenu;
