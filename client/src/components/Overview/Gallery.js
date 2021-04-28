import React, { useState } from 'react';
import DefaultView from './Gallery/DefaultView.js';
import GalleryThumbnails from './Gallery/GalleryThumbnails.js';
import { Left } from './../../Styles/Overview';

class Gallery extends React.Component {
  constructor (props) {
    super(props);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.state = {
      numImgs: 0,
      lastStyleIndex: 0,
      lastImgIndex: 0,
      currLastIndex: 0,
      prevLastIndex: 0,
      galLeft: 0,
      galTop: 0,
      galHeight: 0,
      galWidth: 0,
      buttonHeight: 0,
      buttonWidth: 0,
      currIndex: 0,
    };
  }

  componentDidMount() {
    console.log('componentDidMount in Gallery');
    // WATCH GALLERY
    const resize_gallery = new ResizeObserver((entries) => {
      let rect = entries[0].contentRect;
      let width = rect.width;
      let height = rect.height;

      let element = entries[0].target;
      var top = 0;
      var left = 0;

      while (element !== null) {
        top += element.offsetTop;
        left += element.offsetLeft;
        element = element.offsetParent;
      }

      if (this.state.galWidth !== width || this.state.galHeight !== height) {
        this.setState({
          galLeft: left,
          galTop: top,
          galHeight: height,
          galWidth: width,
        });
      }
    });

    resize_gallery.disconnect();
    if (document.getElementById('gallery') !== null) {
      resize_gallery.observe(document.getElementById('gallery'));
    }
  }

  componentDidUpdate() {
    console.log('componentDidUpdate in Gallery');

    // GET BUTTON SIZE
    const resize_button = new ResizeObserver((entries) => {
      let rect = entries[0].borderBoxSize[0];

      let width = rect.inlineSize;
      let height = rect.blockSize;

      if (this.state.buttonWidth !== width || this.state.buttonHeight !== height) {
        this.setState({
          buttonHeight: height,
          buttonWidth: width,
        });
      }
    });

    resize_button.disconnect();
    if (document.getElementById('lrbuttons') !== null) {
      resize_button.observe(document.getElementById('lrbuttons'));
    }

    // PARSE IMAGES
    let imgCount = 0;
    let currIndex = 0;
    let prevLastIndex = 0;
    let currLastIndex = 0;
    let atCurrent = false;
    for (let i = 0; i < this.props.styles.length; i++) {
      let style = this.props.styles[i];
      for (let j = 0; j < style.photos.length; j++) {
        imgCount++;
        if (!atCurrent) {
          currIndex++;
        }
        if (i === this.props.currImg[0] - 1){
          prevLastIndex = j;
        }
        if (i === this.props.currImg[0]) {
          currLastIndex = j;
          if (j === this.props.currImg[1]) {
            atCurrent = true;
          }
        }
      }
    }
    if (this.state.numImgs !== imgCount || this.state.currLastIndex !== currLastIndex || this.state.prevLastIndex !== prevLastIndex) {
      this.setState({
        numImgs: imgCount,
        lastStyleIndex: this.props.styles.length - 1,
        lastImgIndex: this.props.styles[this.props.styles.length - 1].photos.length - 1,
        currLastIndex: currLastIndex,
        prevLastIndex: prevLastIndex,
      })
    }
    if (this.state.currIndex !== currIndex) {
      this.setState({
        currIndex: currIndex,
      });
    }
  }

  handleImgClick(x, y) {
    console.log('style', x);
    console.log('photo', y);
    this.props.changeImg(x, y);
  }

  render() {

    const styles = this.props.styles;
    const currImg = this.props.currImg;

    return(
      <Left style={{alignContent: 'center'}}>
        <div id="gallery" style={{ height: '66vh', minHeight: '400px', overflow: 'hidden' }}>
          <DefaultView
            styles={styles}
            currImg={currImg}
            lastImgIndex={this.state.lastImgIndex}
            lastStyleIndex={this.state.lastStyleIndex}
            currLastIndex={this.state.currLastIndex}
            prevLastIndex={this.state.prevLastIndex}
            handleImgClick={this.handleImgClick}
            galLeft={this.state.galLeft}
            galTop={this.state.galTop}
            galHeight={this.state.galHeight}
            galWidth={this.state.galWidth}
            buttonHeight={this.state.buttonHeight}
            buttonWidth={this.state.buttonWidth}
            numImgs={this.state.numImgs}
            currIndex={this.state.currIndex}/>
          <GalleryThumbnails
            galHeight={this.state.galHeight}
            galWidth={this.state.galWidth}
            galLeft={this.state.galLeft}
            galTop={this.state.galTop}
            styles={styles}
            currImg={currImg}
            numImgs={this.state.numImgs}
            handleImgClick={this.handleImgClick}
            currIndex={this.state.currIndex}
            id="defaultThumbs"/>
        </div>
      </Left>
    );
  }
}

export default Gallery;