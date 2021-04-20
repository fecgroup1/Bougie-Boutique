import React from 'react';

const stylethumb = {
  objectFit: 'cover',
  objectPosition: '50% 50%',
  width: '88px',
  height: '88px',
  margin: '3px',
  border: '6px solid white',
}
const thumbhighlight = {
  objectFit: 'cover',
  objectPosition: '50% 50%',
  width: '88px',
  height: '88px',
  margin: '6px',
  border: '3px solid white',
  outline: '3px solid #002a60'
}

const Thumbnails = ({styles, currStyle, changeStyle}) => (
  <div id="stylethumbs">
    {styles.map((style, index) => {
      if (index === currStyle) {
        return (
          <img
            key={index}
            style={thumbhighlight}
            src={style.photos[0].thumbnail_url}/>
        );
      } else {
        return (
          <img
            key={index}
            onClick={() => changeStyle(index)}
            style={stylethumb}
            src={style.photos[0].thumbnail_url}/>
        );
      }
    })}
    </div>
);

export default Thumbnails;