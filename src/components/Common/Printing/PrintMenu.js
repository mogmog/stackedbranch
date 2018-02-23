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

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
/*DO NOT COPY THIS APPROACH - ONLY DONE BECAUSE THE ANIMATION WAS GLITCHING AND WE DO NOT HAVE WEBPACK FOR SVG SET UP YET!*/
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

export default () => (
  <MotionMenu
    onOpen={()=>{}}
    type="horizontal"
    reverse={true}
    margin={60}
  >
    <div>


      <svg width="74px" height="63px" viewBox="0 0 74 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>boton</title>
        <desc>Created with Sketch.</desc>
        <defs>
          <path d="M0,26.4 L0,26.4 C1.7855739e-15,40.9803174 11.8196826,52.8 26.4,52.8 L52.8,52.8 L52.8,26.4 C52.8,11.8196826 40.9803174,-2.67836085e-15 26.4,0 L26.4,0 C11.8196826,2.67836085e-15 -1.7855739e-15,11.8196826 0,26.4 Z" id="path-1"></path>
          <filter x="-16.1%" y="-12.3%" width="132.2%" height="132.2%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.847   0 0 0 0 0.847   0 0 0 0 0.847  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
        </defs>
        <g id="OVERVIEW:-attraction-power-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-1184.000000, -199.000000)">
          <g id="botonera" transform="translate(923.000000, 194.000000)">
            <g id="boton" transform="translate(304.335238, 38.258579) rotate(-135.000000) translate(-304.335238, -38.258579) translate(277.835238, 11.758579)">
              <g id="bg" transform="translate(26.400000, 26.400000) rotate(-90.000000) translate(-26.400000, -26.400000) ">
                <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-1"></use>
              </g>
              <polygon id="+" fill="#29A5E9" transform="translate(26.790000, 26.730000) rotate(-225.000000) translate(-26.790000, -26.730000) " points="25.98 35.46 27.66 35.46 27.66 27.54 35.58 27.54 35.58 25.98 27.66 25.98 27.66 18 25.98 18 25.98 25.98 18 25.98 18 27.54 25.98 27.54"></polygon>
            </g>
          </g>
        </g>
      </svg>

      {/*<ReactSVG path={require('../../../assets/svg/ic-actions-button-open.svg')}/>*/}


    </div>

    <div onClick={printDocument} style={{'marginTop': '5px'}}>

      <svg width="56px" height="56px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>share-button</title>
        <desc>Created with Sketch.</desc>
        <defs>
          <filter x="-22.7%" y="-18.2%" width="145.5%" height="145.5%" filterUnits="objectBoundingBox" id="filter-1">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.847   0 0 0 0 0.847   0 0 0 0 0.847  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g id="PLUS-Options" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-92.000000, -415.000000)">
          <g id="share-button" transform="translate(89.000000, 410.000000)">
            <g id="boton-copy-8" filter="url(#filter-1)" transform="translate(31.112698, 31.112698) rotate(-45.000000) translate(-31.112698, -31.112698) translate(9.112698, 9.112698)">
              <circle id="Oval" fill="#5F639E" cx="22" cy="22" r="22"></circle>
              <g id="Page-1" transform="translate(20.792893, 20.792893) rotate(-315.000000) translate(-20.792893, -20.792893) translate(10.292893, 8.292893)" fill="#FFFFFF">
                <path d="M15.9883721,18.0231977 C17.4436047,18.0231977 18.6046512,19.1842442 18.6046512,20.6394767 C18.6046512,22.095 17.4436047,23.2557558 15.9883721,23.2557558 C14.5331395,23.2557558 13.372093,22.095 13.372093,20.6394767 C13.372093,19.1842442 14.5331395,18.0231977 15.9883721,18.0231977 M4.36046512,9.88366279 C5.81569767,9.88366279 6.97674419,11.0447093 6.97674419,12.4999419 C6.97674419,13.9551744 5.81569767,15.1162209 4.36046512,15.1162209 C2.90523256,15.1162209 1.74418605,13.9551744 1.74418605,12.4999419 C1.74418605,11.0447093 2.90523256,9.88366279 4.36046512,9.88366279 M15.9883721,1.74412791 C17.4436047,1.74412791 18.6046512,2.90517442 18.6046512,4.36040698 C18.6046512,5.81563953 17.4436047,6.97668605 15.9883721,6.97668605 C14.5331395,6.97668605 13.372093,5.81563953 13.372093,4.36040698 C13.372093,2.90517442 14.5331395,1.74412791 15.9883721,1.74412791 M15.9883721,-5.81395347e-05 C13.590407,-5.81395347e-05 11.627907,1.96244186 11.627907,4.36040698 C11.627907,4.73511628 11.6831395,5.09383721 11.7732558,5.44151163 L7.04040698,9.06622093 C6.2997093,8.48627907 5.36831395,8.13947674 4.36046512,8.13947674 C1.9625,8.13947674 -1.77635684e-13,10.1019767 -1.77635684e-13,12.4999419 C-1.77635684e-13,14.897907 1.9625,16.860407 4.36046512,16.860407 C5.37267442,16.860407 6.30726744,16.5092442 7.0494186,15.9246512 L11.7732558,19.5493605 C11.6819767,19.8996512 11.627907,20.2618605 11.627907,20.6394767 C11.627907,23.0374419 13.590407,24.9999419 15.9883721,24.9999419 C18.3863372,24.9999419 20.3488372,23.0374419 20.3488372,20.6394767 C20.3488372,18.2415116 18.3863372,16.2790116 15.9883721,16.2790116 C14.5982558,16.2790116 13.3543605,16.9380233 12.5543605,17.9595349 L8.18488372,14.589186 C8.52761628,13.9673837 8.72093023,13.2566279 8.72093023,12.4999419 C8.72093023,11.739186 8.52238372,11.0261047 8.17587209,10.4013953 L12.5543605,7.03104651 C13.3540698,8.05604651 14.5956395,8.72087209 15.9883721,8.72087209 C18.3863372,8.72087209 20.3488372,6.75837209 20.3488372,4.36040698 C20.3488372,1.96244186 18.3863372,-5.81395347e-05 15.9883721,-5.81395347e-05" id="Fill-1"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>

    <div onClick={printDocument} style={{'marginTop': '5px'}}>
      <svg width="56px" height="56px" viewBox="0 0 56 56" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>screen-shot-button</title>
        <desc>Created with Sketch.</desc>
        <defs>
          <filter x="-22.7%" y="-18.2%" width="145.5%" height="145.5%" filterUnits="objectBoundingBox" id="filter-1">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.847   0 0 0 0 0.847   0 0 0 0 0.847  0 0 0 1 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
        </defs>
        <g id="PLUS-Options" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-92.000000, -487.000000)">
          <g id="screen-shot-button" transform="translate(89.000000, 482.000000)">
            <g id="boton-copy-9" filter="url(#filter-1)" transform="translate(31.112698, 31.112698) rotate(-45.000000) translate(-31.112698, -31.112698) translate(9.112698, 9.112698)">
              <circle id="Oval" fill="#5F639E" cx="22" cy="22" r="22"></circle>
              <g id="camara-foto" transform="translate(7.707107, 6.292893)">
                <path d="M14.9,12.2 C13.1,12.2 11.7,13.6 11.7,15.4 C11.7,17.2 13.1,18.6 14.9,18.6 C16.7,18.6 18.1,17.2 18.1,15.4 C18.1,13.6 16.7,12.2 14.9,12.2" id="Fill-1" stroke="#FFFFFF" strokeWidth="2" transform="translate(14.900000, 15.400000) rotate(44.000000) translate(-14.900000, -15.400000) "></path>
                <path d="M23.4996,7.9998 L20.8006,7.9998 L19.6006,6.5998 C19.3996,6.2998 19.3006,5.9998 18.6006,5.9998 L11.1996,5.9998 C10.6006,5.9998 10.3996,6.2998 10.1996,6.5998 L9.1006,7.9998 L6.3996,7.9998 C5.1006,7.9998 3.9996,8.5998 3.9996,10.3998 L3.9996,21.7998 C3.9996,23.1008 5.1006,23.9998 6.3996,23.9998 L23.6006,23.9998 C24.8996,23.9998 25.9996,22.9998 25.9996,21.7998 L25.9996,10.3998 C25.8996,8.3998 24.6996,7.9998 23.4996,7.9998" id="Fill-3" stroke="#FFFFFF" strokeWidth="2" transform="translate(14.999600, 14.999800) rotate(44.000000) translate(-14.999600, -14.999800) "></path>
                <path d="M23.0071068,18.8928932 C22.3081068,18.8928932 21.7071068,18.2928932 21.7071068,17.5928932 C21.7071068,16.8928932 22.3081068,16.2928932 23.0071068,16.2928932 C23.7071068,16.2928932 24.3081068,16.8928932 24.3081068,17.5928932 C24.3081068,18.3928932 23.7071068,18.8928932 23.0071068,18.8928932" id="Path" fill="#FFFFFF"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>

  </MotionMenu>
);

