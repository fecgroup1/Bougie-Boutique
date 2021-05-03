import React from 'react';

import { ThumbImg, CurrThumb, Loading, StylePlaceholder, SelectedStylePlaceholder, PlaceholderBorder } from './../../../../Styles/Overview';

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
    const title = this.props.title;
    const styles = this.props.styles;
    const currStyle = this.props.currStyle;
    const changeStyle = this.props.changeStyle;

    const thumbsGrid = {
      display: 'grid',
      gridTemplateAreas: `
        "style style style style"
        "thumb thumb thumb thumb"
      `,
      columnGap: '1fr',
      rowGap: '0.75vh',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      marginBottom: '0.5%',
    }

    return (
      <div id="stylethumbs" style={thumbsGrid}>
        <div className="stylename small" style={{ gridArea: 'style' }}>
            Style: {styles[currStyle].name}
        </div>
        {styles.map((style, index) => {
          if (style.name === null) {
            return (
              <Loading
                key={index}
                src={style.photos[0].thumbnail_url}
                alt="Thumbnail image is loading"/>
            )
          } else if (index === currStyle) {
            if (style.photos[0].thumbnail_url === null) {
              return (
                <PlaceholderBorder key={index}>
                <SelectedStylePlaceholder
                  onClick={() => changeStyle(index)}
                  alt={`Thumbnail image for ${style.name} style ${title} is unavailable`}
                  src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"/>
                </PlaceholderBorder>
              );
            } else {
              return (
                <CurrThumb
                  key={index}
                  alt={`Thumbnail image for currently selected ${style.name} style ${title}`}
                  src={style.photos[0].thumbnail_url}/>
              );
            }
          } else if (style.photos[0].thumbnail_url === null) {
            return (
              <StylePlaceholder
                key={index}
                alt={`Thumbnail image for ${style.name} style ${title} is unavailable`}
                onClick={() => changeStyle(index)}
                src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"/>
            );
          } else {
            return (
              <ThumbImg
                key={index}
                alt={`Thumbnail image for ${style.name} style ${title}`}
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