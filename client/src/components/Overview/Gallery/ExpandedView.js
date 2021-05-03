import React, { useState } from 'react';
import Modal from 'react-modal';
import { ThemeConsumer } from 'styled-components';
import GalleryThumbnails from './GalleryThumbnails.js';
import ScrollButtons from './ScrollButtons.js';

const ExpandedView = ({ styles, currImg, isOpen, handleModalOpen, handleImgClick, numImgs, lastImgIndex, lastStyleIndex, currLastIndex, prevLastIndex, buttonHeight, buttonWidth }) => {
  const [zoom, setZoom] = useState(0);
  const [imgTop, setImgTop] = useState(50);
  const [imgLeft, setImgLeft] = useState(50);

  const handleMouseMove = (event) => {
    let x = 0;

    if (!zoom) {
      let leftMargin = document.getElementById("gallerymodal").clientWidth - document.getElementById("expandedgallery").clientWidth;
      x = event.clientX - 40 - leftMargin;
    } else {
      x = event.clientX - 40;
    }

    let y = event.clientY - 40;
    let height = document.getElementById("gallerymodal").clientHeight;
    let width = document.getElementById("gallerymodal").clientWidth;
    let imgHeight = event.target.offsetHeight;
    let imgWidth = event.target.offsetWidth;
    let top = y / height * 100
    let left = x / width * 100
    let cappedTop = top > 100 ? 100: top
    let cappedLeft = left > 100 ? 100: left;
    cappedTop = imgHeight <= height ? 50: cappedTop;
    cappedLeft = imgWidth <= width ? 50: cappedLeft;

    setImgTop(cappedTop);
    setImgLeft(cappedLeft);
  };

  const handleZoom = () => {
    setZoom(!zoom);
    setImgTop(50);
    setImgLeft(50);
  }

  const contentStyles = {
    display: 'flex',
    gridAutoRows: '100%',
    gridAutoColumns: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };
  const container = {
    position: 'absolute',
    height: '100%',
    width: zoom ? '100%': `${(window.innerWidth - 80) - ((window.innerHeight - 80) * (0.13 + (0.13 / 2)))}px`,
    right: 0,
    overflow: 'hidden',
  }
  const imgBox = {
    display: 'block',
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: `${imgTop}%`,
    left: `${imgLeft}%`,
    transform: `translate(-${imgLeft}%, -${imgTop}%)`,
  };
  const scrollImg = {
    display: 'block',
    width: 'auto',
    height: !zoom ? '': `${(window.innerHeight - 80) * 2.5}px`,
    cursor: `url('${zoom ? '/assets/minus.png': '/assets/plus.png'}'), ${zoom ? 'zoom-out': 'zoom-in'}`,
  };

  return (
    <ThemeConsumer>
      { theme =>
        <Modal
          id="gallerymodal"
          style={{ overlay: {
            zIndex: 10,
            background: `rgba${theme.bg.slice(3, -1)}, 0.75)`,
          }, content: contentStyles }}
          isOpen={isOpen}
          onRequestClose={() => handleModalOpen(false)}
          appElement={document.getElementById('app')}>
            <ScrollButtons
              currImg={currImg}
              lastImgIndex={lastImgIndex}
              lastStyleIndex={lastStyleIndex}
              currLastIndex={currLastIndex}
              prevLastIndex={prevLastIndex}
              handleImgClick={handleImgClick}
              galHeight={window.innerHeight - 90}
              galWidth={window.innerWidth - 90}
              galLeft={0}
              galTop={0}
              buttonHeight={buttonHeight}
              buttonWidth={buttonWidth} />
            <button
              onClick={() => handleModalOpen(false)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '5%',
                padding: '5px',
                zIndex: 12,
                fontSize: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                background: 'none',
                border: 'none',
                color: theme.text,
              }}><i className="lni lni-close"></i>
            </button>
            <div id="expandedbg" style={{
              position: 'absolute',
              background: theme.bg,
              height: '100%',
              width: '100%'
            }}></div>
            <div id="expandedgallery" style={container}>
              <div id="imgbox" style={imgBox}>
                <img
                  onClick={handleZoom}
                  onMouseMove={(event) => handleMouseMove(event)}
                  style={scrollImg}
                  src={styles[currImg[0]].photos[currImg[1]].url} />
                </div>
            </div>
            {zoom ? null:
              <GalleryThumbnails
              styles={styles}
              currImg={currImg}
              handleImgClick={handleImgClick}
              galHeight={-1}
              numImgs={numImgs}
              id="expandedThumbs"/>
            }
        </Modal>
      }
    </ThemeConsumer>
  );
};

export default ExpandedView;