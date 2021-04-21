import React from 'react';

import { ThumbImg, CurrThumb } from './../../../../Styles';

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currStyle !== nextProps.currStyle) {
      return true;
    }
    if (this.props.styles[0].style_id != nextProps.styles[0].style_id) {
      return true;
    }
    return false;
  }

  render() {
    const styles = this.props.styles;
    const currStyle = this.props.currStyle;
    const changeStyle = this.props.changeStyle;
    const thumbsGrid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 100px)',
      columnGap: '1fr',
      gridAutoRows: '110px',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      margin: '5px 0px',
    }

    return (
      <div id="stylethumbs" style={thumbsGrid}>
        {styles.map((style, index) => {
          if (index === currStyle) {
            return (
              <CurrThumb
                key={index}
                src={style.photos[0].thumbnail_url}/>
            );
          } else {
            return (
              <ThumbImg
                key={index}
                onClick={() => changeStyle(index)}
                src={style.photos[0].thumbnail_url}/>
            );
          }
        })}
    </div>
    );
  }
}

export default Thumbnails;