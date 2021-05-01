import React, { useState } from 'react';
import ExpandedView from './ExpandedView.js';
import ScrollButtons from './ScrollButtons.js';
import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

const DefaultView = ({ title, styles, currImg, lastImgIndex, lastStyleIndex, currLastIndex, prevLastIndex, handleImgClick, galHeight, galWidth, galLeft, galTop, buttonHeight, buttonWidth, numImgs }) => {
  // STATE
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (bool) => {
    document.body.style.overflow = bool ? 'hidden': 'unset';

    setModalOpen(bool);
  }

  if (styles[0].name === null) {
    return (
      <Loading
        src={styles[currImg[0]].photos[currImg[1]].url}
        alt={'Image is loading'} />
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
          src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'
          alt={`Image ${currImg[1]} for ${styles[currImg[0]].name} style ${title} is unavailable`}/>
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
          src={styles[currImg[0]].photos[currImg[1]].url}
          alt={`Image ${currImg[1]} for ${styles[currImg[0]].name} style ${title}`}/>
        <ExpandedView
          isOpen={modalOpen}
          styles={styles}
          currImg={currImg}
          numImgs={numImgs}
          lastImgIndex={lastImgIndex}
          lastStyleIndex={lastStyleIndex}
          currLastIndex={currLastIndex}
          prevLastIndex={prevLastIndex}
          handleModalOpen={handleModalOpen}
          handleImgClick={handleImgClick}
          buttonHeight={buttonHeight}
          buttonWidth={buttonWidth}/>
    </>
    );
  }
};

export default DefaultView;