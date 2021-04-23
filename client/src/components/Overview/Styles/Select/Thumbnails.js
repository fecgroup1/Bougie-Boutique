import React from 'react';

import { ThumbImg, CurrThumb, Loading } from './../../../../Styles/Overview';

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currStyle !== nextProps.currStyle) {
      console.log('Overview thumbnails re-rendered')
      return true;
    }
    if (this.props.styles[0].style_id != nextProps.styles[0].style_id) {
      console.log('Overview thumbnails re-rendered')
      return true;
    }
    console.log('Overview thumbnails did not rerender')
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
      gridAutoRows: '100px',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      margin: '5px 0px',
    }

    return (
      <div id="stylethumbs" style={thumbsGrid}>
        {styles.map((style, index) => {
          if (style.name === null) {
            return (
              <Loading
                key={index}
                src={style.photos[0].thumbnail_url}/>
            )
          }
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