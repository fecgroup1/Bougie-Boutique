import React from 'react';

// class Thumbnails extends React.Component {
//   constructor(props) {
//     super({styles, currStyle, changeStyle});
//     this.state = {
//       currStyle: currStyle
//     }
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick()

const Thumbnails = ({styles, currStyle, changeStyle}) => (
  <div id="stylethumbs">
    {styles.map((style, index) => {
      if (index === currStyle) {
        return (
          <img
            key={index}
            className="imghl stylethumb"
            src={style.photos[0].thumbnail_url}/>
        );
      } else {
        return (
          <img
            key={index}
            onClick={() => changeStyle(index)}
            className="stylethumb"
            src={style.photos[0].thumbnail_url}/>
        );
      }
    })}
    </div>
);

export default Thumbnails;