import React, { useState } from 'react';
import ExpandedView from './ExpandedView.js';
import ScrollButtons from './ScrollButtons.js';
import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

const DefaultView = ({ styles, currImg, lastImgIndex, lastStyleIndex, currLastIndex, prevLastIndex, handleImgClick, galHeight, galWidth, galLeft, galTop, buttonHeight, buttonWidth, numImgs }) => {
  // STATE
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (bool) => {
    document.body.style.overflow = bool ? 'hidden': 'unset';

    setModalOpen(bool);
  }

  if (styles[0].name === null) {
    return (
      <Loading
        src={styles[currImg[0]].photos[currImg[1]].url} />
    );
  } else if (styles[currImg[0]].photos[currImg[1]].url === null) {
    return (
      <>
        <ScrollButtons
          currImg={currImg}
          lastImgIndex={lastImgIndex}
          lastStyleIndex={lastStyleIndex}
          currLastIndex={currLastIndex}
          prevLastIndex={prevLastIndex}
          handleImgClick={handleImgClick}
          galHeight={galHeight}
          galWidth={galWidth}
          galLeft={galLeft}
          galTop={galTop}
          buttonHeight={buttonHeight}
          buttonWidth={buttonWidth} />
        <MainNull
          src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'/>
      </>
    );
  } else {
    return (
      <>
        <ScrollButtons
          currImg={currImg}
          lastImgIndex={lastImgIndex}
          lastStyleIndex={lastStyleIndex}
          currLastIndex={currLastIndex}
          prevLastIndex={prevLastIndex}
          handleImgClick={handleImgClick}
          galHeight={galHeight}
          galWidth={galWidth}
          galLeft={galLeft}
          galTop={galTop}
          buttonHeight={buttonHeight}
          buttonWidth={buttonWidth} />
        <MainImg
          onClick={() => handleModalOpen(true)}
          src={styles[currImg[0]].photos[currImg[1]].url}/>
        <ExpandedView
          isOpen={modalOpen}
          styles={styles}
          currImg={currImg}
          numImgs={numImgs}
          handleModalOpen={handleModalOpen}
          handleImgClick={handleImgClick}/>
    </>
    );
  }
};

export default DefaultView;