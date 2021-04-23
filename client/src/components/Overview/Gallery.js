import React from 'react';
import { Left, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer, Loading, ScrollBg } from './../../Styles/Overview';

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

    const changeImg = this.props.changeImg;
    const styles = this.props.styles;
    const currImg = this.props.currImg;

    const galImg = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '100%',
      height: '100%'
    };
    const position = {
      transform: `translateY(${this.state.position}vh)`,
      zIndex: 1,
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
      opacity: `${styles[0].name === null ||
                  this.state.scrollTop >= 0? '0': '0.5'}`,
    };
    const thumb = {
      width: '6vh',
      height: '6vh',
    }
    const buttonContainer = {
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '65vh',
      margin: '0.5vh 1vw',
    }

    return (
      <Left style={{alignContent: 'center', minWidth: '400px'}}>
        <div id="gallery" style={{height: '66vh'}}>
          {styles[0].name === null ? <Loading
            src={styles[currImg[0]].photos[currImg[1]].url} />:
            <img
            style={galImg}
            src={styles[currImg[0]].photos[currImg[1]].url}/>}

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
                        return <CurrGallThumb
                          key={[sIndex, pIndex]}
                          src={photo.thumbnail_url} />
                    } else {
                      return <GallThumb
                        key={[sIndex, pIndex]}
                        src={photo.thumbnail_url}
                        onClick={() => {changeImg(sIndex, pIndex)}} />
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
              style={upOpacity}
              onClick={() => this.scroll('up')}>
              <i className="lni lni-chevron-up-circle"></i>
            </GalleryScroll>
            <GalleryScroll
              style={
                {
                  opacity: `${this.state.scrollBtm ||
                    (styles[0].name === null) ||
                    (this.state.numImgs <= 7) ? '0': '0.5'}`,
                }
              }
              onClick={() => this.scroll('down')}>
            <i className="lni lni-chevron-down-circle"></i>
            </GalleryScroll>
          </GallThumbContainer>

        </div>
      </Left>
    );
  }
}

export default Gallery;