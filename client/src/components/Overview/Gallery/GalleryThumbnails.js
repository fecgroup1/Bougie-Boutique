import React from 'react';
import { GallPlaceholder, GallergyBorder, SelectedGallPlaceholder, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer } from './../../../Styles/Overview';

class GalleryThumbnails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollTop: 0,
      scrollBtm: false,
    };
    this.scroll = this.scroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }



  handleScroll() {
    let scrollTop = document.getElementById(this.props.id).scrollTop;
    let scrollHeight = document.getElementById(this.props.id).scrollHeight;
    let clientHeight = document.getElementById(this.props.id).clientHeight;
    let scrollBtm = (scrollHeight - scrollTop === clientHeight);
    this.setState({
      scrollTop: scrollTop,
      scrollBtm: scrollBtm
    });
  }

  scroll(direction) {
    if (direction === 'up') {
      document.getElementById(this.props.id).scrollBy({
        top: '-200',
        left: 0,
        behavior: 'smooth'
      });
    } else if (direction === 'down') {
      document.getElementById(this.props.id).scrollBy({
        top: '200',
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  render() {
    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const handleImgClick = this.props.handleImgClick;
    const numImgs = this.props.numImgs;
    const galHeight = this.props.galHeight;
    // const galWidth = this.props.galWidth;
    const galTop = this.props.galTop;
    const galLeft = this.props.galLeft;

    const thumbsBg = {
      opacity: `${styles[0].name === null ? '0': '0.5'}`,
      width: galHeight * 0.13,
      height: galHeight * 0.87,
      margin: `${0.13 * galHeight / 2}px ${0.13 * galHeight / 4}px`,
      top: galTop,
      left: galLeft,
    };
    const thumbContainer = {
      display: 'flex',
      justifyItems: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: 'none',
      width: galHeight * 0.13,
      height: galHeight * 0.87,
      margin: `${0.13 * galHeight / 2}px ${0.13 * galHeight / 4}px`,
      top: galTop,
      left: galLeft,
    };
    const thumbsGrid = {
      gridTemplateColumns: galHeight * 0.115,
      gridAutoRows: galHeight * 0.115,
      zIndex: 2,
      width: galHeight * 0.115,
      height: galHeight * 0.85,
      margin: 0,
    }
    const thumbSize = {
      width: galHeight * 0.115 - 10,
      height: galHeight * 0.115 - 10,
    }
    const upOpacity = {
      background: ((styles[0].name === null) ||
                (this.state.scrollTop <= 0) ||
                (numImgs <= 7)) ? 'none': '',
      fontSize: `${galHeight * 0.07 / 2}px`,
      lineHeight: `${galHeight * 0.07 / 2}px`,
    };
    const downOpacity = {
      background: ((this.state.scrollBtm) ||
                (styles[0].name === null) ||
                (numImgs <= 7)) ? 'none': '',
      fontSize: `${galHeight * 0.07 / 2}px`,
      lineHeight: `${galHeight * 0.07 / 2}px`,
    };
    const buttonContainer = {
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 0.985 * galHeight,
      width: galHeight * 0.13,
      margin: `${0.015 * galHeight / 2}px ${0.13 * galHeight / 4}px`,
      zIndex: 0,
      top: galTop,
      left: galLeft,
    }

    return (
    <>
      <GallThumbContainer id="gallerybg" style={thumbsBg}></GallThumbContainer>

      <GallThumbContainer id="thumbscontainer" style={thumbContainer}>
        <NoScrollBar
          id={this.props.id}
          style={thumbsGrid}
          onScroll={this.handleScroll}>
            {styles.map((style, sIndex) => {
              return style.photos.map((photo, pIndex) => {
                if (styles[0].name === null) {
                  return null;
                } else if ((sIndex === currImg[0]) &&
                    (pIndex === currImg[1])) {
                    if (photo.thumbnail_url === null) {
                      return (
                        <GallergyBorder key={[sIndex, pIndex]}>
                          <SelectedGallPlaceholder
                            id={`img${sIndex}-${pIndex}`}
                            src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"/>
                        </GallergyBorder>
                      );
                    } else {
                      return (
                        <CurrGallThumb
                          style={thumbSize}
                          key={[sIndex, pIndex]}
                          id={`img${sIndex}-${pIndex}`}
                          src={photo.thumbnail_url} />
                      );
                    }
                } else if (photo.thumbnail_url === null) {
                  return (
                    <GallPlaceholder
                      key={[sIndex, pIndex]}
                      id={`img${sIndex}-${pIndex}`}
                      onClick={() => {handleImgClick(sIndex, pIndex)}}
                      src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"/>
                  );
                } else {
                  return (
                    <GallThumb
                      style={thumbSize}
                      key={[sIndex, pIndex]}
                      id={`img${sIndex}-${pIndex}`}
                      src={photo.thumbnail_url}
                      onClick={() => {handleImgClick(sIndex, pIndex)}} />
                  );
                }
              })
            })}
        </NoScrollBar>
      </GallThumbContainer>

      <GallThumbContainer id="galscrollbuttons" style={buttonContainer}>
          <GalleryScroll
            style={upOpacity}
            onClick={() => this.scroll('up')}>
              {(styles[0].name === null) || (this.state.scrollTop <= 0) ? null: <i className="lni lni-chevron-up-circle"></i>}
          </GalleryScroll>
          <GalleryScroll
            style={downOpacity}
            onClick={() => this.scroll('down')}>
              {this.state.scrollBtm ||
              (styles[0].name === null) ||
              (numImgs <= 7) ? null: <i className="lni lni-chevron-down-circle"></i>}
          </GalleryScroll>
      </GallThumbContainer>
    </>
    );
  }
}

export default GalleryThumbnails;