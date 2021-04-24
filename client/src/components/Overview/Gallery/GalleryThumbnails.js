import React from 'react';
import { GallPlaceholder, GallergyBorder, SelectedGallPlaceholder, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer, ScrollBg } from './../../../Styles/Overview';

class GalleryThumbnails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      numImgs: 0,
      position: 0,
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
    let pos = this.state.position;
    if (direction === 'up') {
      document.getElementById(this.props.id).scrollBy({
        top: '-100',
        left: 0,
        behavior: 'smooth'
      });
    } else if (direction === 'down') {
      document.getElementById(this.props.id).scrollBy({
        top: '100',
        left: 0,
        behavior: 'smooth'
      });
    }
    this.setState({
      position: pos,
    });
  }

  render() {
    this.state.numImgs = 0;

    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const handleImgClick = this.props.handleImgClick;

    const position = {
      transform: `translateY(${this.state.position}vh)`,
      zIndex: 2,
    }
    const container = {
      display: 'grid',
      justifyItems: 'center',
      background: 'none',
    };
    const bg = {
      opacity: `${styles[0].name === null ? '0': '0.5'}`,
    };
    const upOpacity = {
      opacity: (styles[0].name === null) || (this.state.scrollTop <= 0) ? 0: 0.5,
    };
    const buttonContainer = {
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64vh',
      margin: '1vh 1vw',
      zIndex: 0,
    }

    return (
    <>
      <GallThumbContainer style={bg}></GallThumbContainer>

      <GallThumbContainer style={container}>
        <NoScrollBar
          id={this.props.id}
          style={position}
          onScroll={this.handleScroll}>
            {styles.map((style, sIndex) => {
              return style.photos.map((photo, pIndex) => {
                this.state.numImgs++;
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

      <GallThumbContainer style={buttonContainer}>
        <ScrollBg style={upOpacity}></ScrollBg>
        <ScrollBg style={
          {
            opacity: `${this.state.scrollBtm ||
              (styles[0].name === null) ||
              (this.state.numImgs <= 7) ? '0': '0.5'}`,
          }
        }></ScrollBg>
        </GallThumbContainer>

      <GallThumbContainer style={buttonContainer}>
          <GalleryScroll
            onClick={() => this.scroll('up')}>
              {(styles[0].name === null) || (this.state.scrollTop <= 0) ? null: <i className="lni lni-chevron-up-circle"></i>}
          </GalleryScroll>
          <GalleryScroll
            onClick={() => this.scroll('down')}>
              {this.state.scrollBtm ||
              (styles[0].name === null) ||
              (this.state.numImgs <= 7) ? null: <i className="lni lni-chevron-down-circle"></i>}
          </GalleryScroll>
      </GallThumbContainer>
    </>
    );
  }
}

export default GalleryThumbnails;