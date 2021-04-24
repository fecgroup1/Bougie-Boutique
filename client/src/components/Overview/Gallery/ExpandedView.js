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
      imgTop: 50,
      imgLeft: 50,
    };
    this.handleZoom = this.handleZoom.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    if (this.state.zoom) {
      let y = event.clientY;
      let x = event.clientX;
      let height = event.target.height;
      let width = event.target.width;

      console.log(`${y / height * 100}, ${x / width * 100}`);

      this.setState({
        imgTop: y / height * 100,
        imgLet: x / width * 100,
      });
    }
  }

  handleZoom() {
    this.setState({
      zoom: !this.state.zoom
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
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    }
    const container = {
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    };
    const scrollImg = {
      position: 'absolute',
      // top: `${50 - this.state.imgTop}%`,
      // left: `${50 - this.state.imgLeft}%`,
      transform: 'translateX(50%), translateY(50%)',
      objectFit: 'cover',
      objectPosition: `${this.state.imgTop}% ${this.state.imgLeft}%`,
      width: `${100 * (this.state.zoom + 1)}%`,
      height: `${100 * (this.state.zoom + 1)}%`,
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