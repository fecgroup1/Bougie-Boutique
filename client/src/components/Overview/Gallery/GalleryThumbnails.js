import React from 'react';
import { GallPlaceholder, GallergyBorder, SelectedGallPlaceholder, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer } from './../../../Styles/Overview';

class GalleryThumbnails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollTop: 0,
      scrollBtm: false,
      frameHeight: window.innerHeight - 80,
      frameLeft: 0,
      frameTop: 0,
    };
    this.scroll = this.scroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.resize_modal = new ResizeObserver((entries) => {
      let rect = entries[0].contentRect;
      let height = rect.height;

      if (this.state.frameHeight !== height) {
        this.setState({
          frameHeight: height,
        });
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.currIndex !== nextProps.currIndex) {
      let multiplier = nextProps.currIndex - 4.5;
      let pos = this.state.frameHeight * 0.115 * multiplier;
      this.scroll(pos);

      return false;
    }
    return true;
  }

  componentDidUpdate() {
    if (this.props.id === 'defaultThumbs') {
      if (this.props.galHeight !== this.state.frameHeight || this.props.galLeft !== this.state.frameLeft || this.props.galTop !== this.state.frameTop) {
        this.setState({
          frameHeight: this.props.galHeight,
          frameLeft: this.props.galLeft,
          frameTop: this.props.galTop,
        });
      }
    } else if (this.props.id === 'expandedThumbs') {

      this.resize_modal.disconnect();
      if (document.getElementById('gallerymodal') !== null) {
        this.resize_modal.observe(document.getElementById('gallerymodal'));
      }
    }
  }

  componentWillUnmount() {
    this.resize_modal.disconnect();
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

  scroll(arg) {
    if (arg === 'up') {
      document.getElementById(this.props.id).scrollBy({
        top: -200,
        left: 0,
        behavior: 'smooth'
      });
    } else if (arg === 'down') {
      document.getElementById(this.props.id).scrollBy({
        top: 200,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      document.getElementById(this.props.id).scrollTo({
        top: arg,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  render() {
    const title = this.props.title;
    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const handleImgClick = this.props.handleImgClick;
    const numImgs = this.props.numImgs;
    const galHeight = this.state.frameHeight;
    // const galWidth = this.props.galWidth;
    const galTop = this.state.frameTop;
    const galLeft = this.state.frameLeft;

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
      width: galHeight * 0.115,
      height: galHeight * 0.85,
      margin: 0,
    }
    const thumbSize = {
      width: galHeight * 0.115 - 10,
      height: galHeight * 0.115 - 10,
    }
    const upButton = {
      background: ((styles[0].name === null) ||
                (this.state.scrollTop <= 0) ||
                (numImgs <= 7)) ? 'none': '',
      fontSize: `${galHeight * 0.07 / 2}px`,
      lineHeight: `${galHeight * 0.07 / 2}px`,
      height: `${galHeight * 0.07 / 2}px`,
      width: `${galHeight * 0.1 / 2}px`,
      padding: '2px',
    };
    const downButton = {
      background: ((this.state.scrollBtm) ||
                (styles[0].name === null) ||
                (numImgs <= 7)) ? 'none': '',
      fontSize: `${galHeight * 0.07 / 2}px`,
      lineHeight: `${galHeight * 0.07 / 2}px`,
      height: `${galHeight * 0.07 / 2}px`,
      width: `${galHeight * 0.1 / 2}px`,
      padding: '2px',
    };
    const buttonContainer = {
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 0.97 * galHeight,
      width: galHeight * 0.13,
      padding: `${0.04 * galHeight / 2}px ${0.13 * galHeight / 4}px`,
      top: galTop,
      left: galLeft,
    }

    return (
    <>
      <GallThumbContainer id="gallerybg" style={thumbsBg}></GallThumbContainer>

      <GallThumbContainer id="galscrollbuttons" style={buttonContainer}>
          <GalleryScroll
            style={upButton}
            onClick={() => this.scroll('up')}>
              {(styles[0].name === null) || (this.state.scrollTop <= 0) ? null: <i className="lni lni-chevron-up"></i>}
          </GalleryScroll>
          <GalleryScroll
            style={downButton}
            onClick={() => this.scroll('down')}>
              {(this.state.scrollBtm ||
              (styles[0].name === null) ||
              (numImgs <= 7)) ? null: <i className="lni lni-chevron-down"></i>}
          </GalleryScroll>
      </GallThumbContainer>

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
                            src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"
                            alt={`Thumbnail image for currently selected ${style.name} style ${title} is unavailable`}/>
                        </GallergyBorder>
                      );
                    } else {
                      return (
                        <CurrGallThumb
                          style={thumbSize}
                          key={[sIndex, pIndex]}
                          id={`img${sIndex}-${pIndex}`}
                          src={photo.thumbnail_url}
                          alt={`Thumbnail image ${pIndex} for currently selected ${style.name} style ${title}`} />
                      );
                    }
                } else if (photo.thumbnail_url === null) {
                  return (
                    <GallPlaceholder
                      key={[sIndex, pIndex]}
                      id={`img${sIndex}-${pIndex}`}
                      onClick={() => {handleImgClick(sIndex, pIndex)}}
                      src="https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg"
                      alt={`Thumbnail image ${pIndex} for ${style.name} of ${title} is unavailable`}/>
                  );
                } else {
                  return (
                    <GallThumb
                      style={thumbSize}
                      key={[sIndex, pIndex]}
                      id={`img${sIndex}-${pIndex}`}
                      src={photo.thumbnail_url}
                      alt={`Thumbnail image ${pIndex} for ${style.name} of ${title}`}
                      onClick={() => {handleImgClick(sIndex, pIndex)}} />
                  );
                }
              })
            })}
        </NoScrollBar>
      </GallThumbContainer>
    </>
    );
  }
}

export default GalleryThumbnails;