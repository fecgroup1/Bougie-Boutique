import React from 'react';
import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

const DefaultView = ({styles, currImg}) => {

  if (styles[0].name === null) {
  return (
    <Loading
      src={styles[currImg[0]].photos[currImg[1]].url} />
  );
  } else if ( styles[currImg[0]].photos[currImg[1]].url === null) {
    return (
      <MainNull
        // Add onClick
        src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'/>
    );
  } else {
    return (
      <MainImg
        src={styles[currImg[0]].photos[currImg[1]].url}/>
    );
  }
};

export default DefaultView;