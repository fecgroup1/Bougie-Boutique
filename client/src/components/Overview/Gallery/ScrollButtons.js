import React, { useState, useEffect } from 'react';
import ExpandedView from './ExpandedView.js';
import { GalleryScroll } from './../../../Styles/Overview';

const ScrollButtons = ({currImg, lastStyleIndex, lastImgIndex, currLastIndex, prevLastIndex, handleImgClick}) => {

  const [galHeight, setGalHeight] = useState(0);
  const [galWidth, setGalWidth] = useState(0);

  // if (document.getElementById('gallery') !== null) {
  //   let height = document.getElementById('gallery').offsetHeight;
  //   let width = document.getElementById('gallery').offsetHeight;
  //   if (galHeight !== height) {
  //     setGalHeight(height);
  //   }
  //   if (galWidth !== width) {
  //     setGalWidth(width);
  //   }
  // }

  const resize_ob = new ResizeObserver((entries) => {
    let rect = entries[0].contentRect;

    let width = rect.width;
    let height = rect.height;

    setGalWidth(width);
    setGalHeight(height);
  })

  resize_ob.observe(document.getElementById('gallery'));

  var leftOpacity = {
    background: (currImg[0] === 0 && currImg[1] === 0) ? 'none': '',
    borderRadius: '10%',
  };
  var rightOpacity = {
    background: (currImg[0] === lastStyleIndex && currImg[1] === lastImgIndex) ? 'none': '',
    borderRadius: '10%',
  };
  var buttonContainer = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    justifyItems: 'flex-end',
    height: galHeight - 10,
    width: galWidth - 10,
    padding: 5,
  }

  var nextLeft = {
    style: (currImg[1] === 0 && currImg[0] !== 0) ? currImg[0] - 1: currImg[0],
    photo: currImg[1] === 0 && currImg[0] !== 0 ? prevLastIndex: currImg[1]- 1,
  };
  var nextRight = {
    style: currImg[1] === currLastIndex ? currImg[0] + 1: currImg[0],
    photo: currImg[1] === currLastIndex ? 0: currImg[1] + 1,
  };

  return (
    <div style={buttonContainer}>
            <GalleryScroll
              style={leftOpacity}
              onClick={() => handleImgClick(nextLeft.style, nextLeft.photo)}>
                {(currImg[0] === 0 && currImg[1] === 0) ? null: <i className="lni lni-chevron-left"></i>}
            </GalleryScroll>
            <GalleryScroll
              style={rightOpacity}
              onClick={() => handleImgClick(nextRight.style, nextRight.photo)}>
                {(currImg[0] === lastStyleIndex && currImg[1] === lastImgIndex) ? null: <i className="lni lni-chevron-right"></i>}
            </GalleryScroll>
          </div>
  );
};

export default ScrollButtons;