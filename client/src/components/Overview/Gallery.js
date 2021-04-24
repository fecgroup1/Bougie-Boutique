import React from 'react';
import DefaultView from './Gallery/DefaultView.js';
import { Left, GallPlaceholder, GallergyBorder, SelectedGallPlaceholder, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer, ScrollBg } from './../../Styles/Overview';

class Gallery extends React.Component {
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

  handleImgClick(x, y) {
    // FUTURE IMPLEMENTATION: Scroll to thumbnail
    let id = `img${x}-${y}`;
    // let dist = (x + 1) * (y + 1);
    document.getElementById("galleryscroll").scrollTo(document.getElementById(id));
    this.props.changeImg(x, y);
  }

  handleScroll() {
    let scrollTop = document.getElementById("galleryscroll").scrollTop;
    let scrollHeight = document.getElementById("galleryscroll").scrollHeight;
    let clientHeight = document.getElementById("galleryscroll").clientHeight;
    let scrollBtm = (scrollHeight - scrollTop === clientHeight);
    this.setState({
      scrollTop: scrollTop,
      scrollBtm: scrollBtm
    });
  }

  scroll(direction) {
    let pos = this.state.position;
    if (direction === 'up') {
      document.getElementById("galleryscroll").scrollBy({
        top: '-100',
        left: 0,
        behavior: 'smooth'
      });
    } else if (direction === 'down') {
      document.getElementById("galleryscroll").scrollBy({
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
      <Left style={{alignContent: 'center', minWidth: '400px'}}>
        <div id="gallery" style={{ height: '66vh', overflow: 'hidden' }}>
          <DefaultView
            styles={styles}
            currImg={currImg}/>
          <GallThumbContainer style={bg}></GallThumbContainer>

          <GallThumbContainer style={container}>
            <NoScrollBar
              id="galleryscroll"
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
                          onClick={() => {this.handleImgClick(sIndex, pIndex)}}
                          src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"/>
                      );
                    } else {
                      return (
                        <GallThumb
                          key={[sIndex, pIndex]}
                          id={`img${sIndex}-${pIndex}`}
                          src={photo.thumbnail_url}
                          onClick={() => {this.handleImgClick(sIndex, pIndex)}} />
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

        </div>
      </Left>
    );
  }
}

export default Gallery;