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
    const ShareSVG = () => (<svg viewBox="0 0 58 58" width="48" height="48" className={styles.svgShadow}>
      <title>Share</title>
      <circle cx="29" cy="29" r="29" fill="#5f639e" />
      <path d="M34,14.57a5.16,5.16,0,0,0-5.14,5.14A5.05,5.05,0,0,0,29.06,21l-5.58,4.28a5.14,5.14,0,1,0,0,8.09l5.57,4.28a5.09,5.09,0,0,0-.17,1.29A5.16,5.16,0,1,0,30,35.75l-5.15-4a5.1,5.1,0,0,0,0-4.94l5.16-4A5.14,5.14,0,1,0,34,14.57m0,2.06a3.09,3.09,0,1,1-3.09,3.09A3.07,3.07,0,0,1,34,16.62m-13.72,9.6a3.09,3.09,0,1,1-3.09,3.09,3.07,3.07,0,0,1,3.09-3.09M34,35.82a3.09,3.09,0,1,1-3.09,3.09A3.07,3.07,0,0,1,34,35.82" fill="#FFFFFF" />
    </svg>);
    const PrintSVG = () => (<svg viewBox="0 0 58 58" width="48" height="48" className={styles.svgShadow}>
      <title>Print</title>
      <circle cx="29" cy="29" r="29" fill="#5f639e" />
      <path d="M29.36,26.26h-.06A3.19,3.19,0,0,0,26,29.53,3.25,3.25,0,0,0,27,31.85a3.13,3.13,0,0,0,2.32.93,3.2,3.2,0,0,0,3.25-3.27A3.18,3.18,0,0,0,29.36,26.26Z" fill="none" />
      <path d="M41.56,20.07H36.88l-2.45-2.91,0,0h-.1l-11,0c-.1,0-.19.14-.25.23L21,20.12H16.23c-1.49,0-2.07.59-2.07,2.08l0,16.89a1.62,1.62,0,0,0,.56,1.24,2.16,2.16,0,0,0,1.52.53l25.48-.06A2,2,0,0,0,43.83,39l0-16.89C43.7,20.4,43,20.07,41.56,20.07ZM33.73,33.93a6.19,6.19,0,0,1-4.41,1.82H29.2a6.22,6.22,0,0,1,.09-12.44,6.12,6.12,0,0,1,6.24,6.21A6.19,6.19,0,0,1,33.73,33.93Zm6.44-8.59a1.85,1.85,0,1,1,1.88-1.82A1.85,1.85,0,0,1,40.18,25.34Z" fill="none" />
      <path d="M46.75,22.06c-.17-3.2-2-4.93-5.2-4.95H38.24l-1.31-1.53a2.81,2.81,0,0,0-2.64-1.42l-11,0a3,3,0,0,0-2.64,1.46l-1.18,1.51H16.23a4.67,4.67,0,0,0-5,5l0,16.89a4.56,4.56,0,0,0,1.56,3.46,5.22,5.22,0,0,0,3.38,1.27h.1l25.48-.06a5,5,0,0,0,5-4.75Zm-5,18.75-25.48.06a2.16,2.16,0,0,1-1.52-.53,1.62,1.62,0,0,1-.56-1.24l0-16.89c0-1.49.58-2.08,2.07-2.08H21l2.13-2.74c.06-.09.15-.22.25-.23l11,0h.1l0,0,2.45,2.91h4.68c1.4,0,2.13.33,2.23,2.07l0,16.89A2,2,0,0,1,41.77,40.81Z" fill="#fff" />
      <path d="M29.29,23.3a6.22,6.22,0,0,0-.09,12.44h.12a6.16,6.16,0,0,0,6.21-6.24A6.12,6.12,0,0,0,29.29,23.3Zm2.34,8.54a3.25,3.25,0,0,1-2.32.94A3.13,3.13,0,0,1,27,31.85,3.25,3.25,0,0,1,26,29.53a3.19,3.19,0,0,1,3.25-3.27h.06a3.18,3.18,0,0,1,3.2,3.25A3.25,3.25,0,0,1,31.63,31.84Z" fill="#fff" />
      <circle cx="40.2" cy="23.49" r="1.85" transform="translate(16.12 63.33) rotate(-89.14)" fill="#fff" />
    </svg>);
    const PdfSVG = () => (<svg viewBox="0 0 58 58" width="48" height="48" className={styles.svgShadow}>
      <title>PDF</title>
      <circle cx="29" cy="29" r="29" fill="#5f639e" />
      <path fill="#FFFFFF" d="M42.61,30.56h-.52V21l-8.37-9.52H19.44A4.49,4.49,0,0,0,15,16V41.47A4.49,4.49,0,0,0,19.44,46h18.2a4.49,4.49,0,0,0,4.44-4.53V40.37h.52a2.24,2.24,0,0,0,2.22-2.27V32.82A2.24,2.24,0,0,0,42.61,30.56ZM34.3,15.42l4.35,5H34.3Zm5.66,26a2.35,2.35,0,0,1-2.33,2.37H19.44a2.35,2.35,0,0,1-2.33-2.37V16a2.35,2.35,0,0,1,2.33-2.37H32.19v8.86H40v8H28.89a2.24,2.24,0,0,0-2.22,2.26v5.29a2.25,2.25,0,0,0,2.22,2.27H40Zm-1.43-5.79a2.19,2.19,0,0,1-2.44,2.43H34V33.26h2.41C38,33.26,38.54,34.46,38.54,35.68Zm-5.05-.76a1.64,1.64,0,0,1-1.87,1.73h-.87v1.47H29.28V33.26h2.46A1.63,1.63,0,0,1,33.49,34.92Zm9.37-.41H40.64v.6h1.9v1.16h-1.9v1.85H39.17V33.26h3.68Z" />
    </svg>);
    const HelpSVG = () => (<svg viewBox="0 0 58 58" width="48" height="48" className={styles.svgShadow}>
      <title>Help</title>
      <circle cx="29" cy="29" r="29" fill="#00e6a5" />
      <path d="M7.55,21.86H8.81v6.49H16V21.86h1.23V36.14H16V29.46H8.81v6.68H7.55Z" fill="#fff" />
      <path d="M20.94,21.86h7.52l-.15,1.09H22.19v5.41h5v1.11h-5v5.6h6.43v1.09H20.94Z" fill="#fff" />
      <path d="M31.59,21.86h1.25v13.2H39v1.09H31.59Z" fill="#fff" />
      <path d="M41.7,21.86h4a8.39,8.39,0,0,1,2.2.25A3.41,3.41,0,0,1,49.4,23a3.31,3.31,0,0,1,.77,1.31,5.7,5.7,0,0,1,.27,1.83,4.76,4.76,0,0,1-1.06,3.38,4.34,4.34,0,0,1-3.3,1.15H42.95v5.49H41.7Zm3.88,7.68a6.72,6.72,0,0,0,1.76-.18A2.28,2.28,0,0,0,49,27.73a5.83,5.83,0,0,0,.18-1.57,3.53,3.53,0,0,0-.71-2.38,2.13,2.13,0,0,0-1.07-.66,7.35,7.35,0,0,0-1.84-.18H42.95v6.6Z" fill="#fff" />
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
        <div style={{ marginTop: '5px' }}>
          <ShareSVG />
        </div>
        <div onClick={this.printDocument.bind(this)} style={{ marginTop: '5px' }}>
          <PrintSVG />
        </div>
        <div style={{ marginTop: '5px' }}>
          <PdfSVG />
        </div>
        <div style={{ marginTop: '5px' }}>
          <HelpSVG />
        </div>
    </MotionMenu>);
  }
}

export default PrintMenu;
