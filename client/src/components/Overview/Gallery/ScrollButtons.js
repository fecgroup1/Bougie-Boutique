import React from 'react';
import { GalleryScroll } from './../../../Styles/Overview';

const ScrollButtons = ({ currImg, lastStyleIndex, lastImgIndex, currLastIndex, prevLastIndex, handleImgClick, galHeight, galWidth, galLeft, galTop, buttonHeight, buttonWidth }) => {

  var leftOpacity = {
    background: (currImg[0] === 0 && currImg[1] === 0) ? 'none': '',
    borderRadius: '10%',
    zIndex: 2,
    color: (currImg[0] === 0 && currImg[1] === 0) ? 'transparent': '',
  };
  var rightOpacity = {
    background: (currImg[0] === lastStyleIndex && currImg[1] === lastImgIndex) ? 'none': '',
    borderRadius: '10%',
    zIndex: 2,
    color: (currImg[0] === lastStyleIndex && currImg[1] === lastImgIndex) ? 'transparent': '',
  };
  var buttonContainer = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    justifyItems: 'flex-end',
    left: galWidth + galLeft - buttonWidth,
    top: galHeight + galTop - buttonHeight,
    transform: 'translate(-100% -100%)',
    padding: galHeight * 0.01,
  }

  // IMPLEMENT LOOP
  var nextLeft = {
    style: (currImg[1] === 0 && currImg[0] !== 0) ? currImg[0] - 1: currImg[0],
    photo: (currImg[1] === 0) ? prevLastIndex: currImg[1] - 1,
  };
  var nextRight = {
    style: currImg[1] === currLastIndex ? currImg[0] + 1: currImg[0],
    photo: currImg[1] === currLastIndex ? 0: currImg[1] + 1,
  };

  return (
    <div id="lrbuttons" style={buttonContainer}>
      <GalleryScroll
        style={leftOpacity}
        onClick={() => handleImgClick(nextLeft.style, nextLeft.photo)}>
          <i className="lni lni-chevron-left"></i>
      </GalleryScroll>
      <GalleryScroll
        style={rightOpacity}
        onClick={() => handleImgClick(nextRight.style, nextRight.photo)}>
          <i className="lni lni-chevron-right"></i>
      </GalleryScroll>
    </div>
  );
};

export default ScrollButtons;