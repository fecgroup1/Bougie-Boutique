import React from 'react';
import Modal from 'react-modal';
import GalleryThumbnails from './GalleryThumbnails.js';

import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

// Add x in corner to close Modal
class ExpandedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 0,
      imgTop: 0,
      imgLeft: 0,
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    if (this.state.zoom) {
      let y = event.clientY;
      let x = event.clientX;
      let height = document.getElementById("gallerymodal").clientHeight;
      let width = document.getElementById("gallerymodal").clientWidth;
      let top = y / height * 100 * -1
      let left = x / width * 100 * -1
      let cappedTop = top < -100 ? -100: top
      let cappedLeft = left < -100 ? -100: left;

      console.log(`${top}, ${left}`);
      this.setState({
        imgTop: cappedTop,
        imgLeft: cappedLeft,
      });
    }
  }

  handleZoom() {
    this.setState({
      zoom: !this.state.zoom,
      imgTop: 0,
      imgLeft: 0,
    });
  }

  render() {
    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const isOpen = this.props.isOpen;
    const handleModalOpen = this.props.handleModalOpen;
    const handleImgClick = this.props.handleImgClick;

    const overlayStyles = {
      zIndex: 10,
    }
    const contentStyles = {
      display: 'grid',
      gridAutoRows: '100%',
      gridAutoColumns: '100%',
      // gridTemplate: '"a" 100%',
      justifyContent: 'center',
      alignContent: 'center',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }
    const container = {
      display: 'grid',
      gridAutoRows: '100%',
      gridAutoColumns: '100%',
      alignItems: 'center',
      width: `${100 * (this.state.zoom + 1)}%`,
      height: `${100 * (this.state.zoom + 1)}%`,
      margin: 0,
      padding: 0,
      position: 'relative',
      top: `${this.state.imgTop}%`,
      left: `${this.state.imgLeft}%`,
    };
    const scrollImg = {
      // top: `${this.state.imgTop}%`,
      // left: `${this.state.imgLeft}%`,
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      objectPosition: '50% 50%',
    };

    return (
      <Modal
        id="gallerymodal"
        style={{ overlay: overlayStyles, content: contentStyles }}
        isOpen={isOpen}
        onRequestClose={() => handleModalOpen(false)}
        appElement={document.getElementById('app')}>
          <div id="expandedGallery" style={container}>
            <img
              onClick={this.handleZoom}
              onMouseMove={(event) => this.handleMouseMove(event)}
              style={scrollImg}
              src={styles[currImg[0]].photos[currImg[1]].url} />
          </div>
          <GalleryThumbnails
            styles={styles}
            currImg={currImg}
            handleImgClick={handleImgClick}
            id="expandedThumbs"/>
      </Modal>
    );
  }
}

export default ExpandedView;