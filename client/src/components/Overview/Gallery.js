import React from 'react';
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
    };
  }

  componentDidUpdate() {
    let imgCount = 0;
    let prevLastIndex = 0;
    let currLastIndex = 0;
    for (let i = 0; i < this.props.styles.length; i++) {
      let style = this.props.styles[i];
      for (let j = 0; j < style.photos.length; j++) {
        imgCount++;
        if (i === this.props.currImg[0] - 1){
          prevLastIndex++;
        }
        if (i === this.props.currImg[0]) {
          currLastIndex++;
        }
      }
    }
    if (this.state.numImgs !== imgCount) {
      this.setState({
        numImgs: imgCount,
        lastStyleIndex: this.props.styles.length - 1,
        lastImgIndex: this.props.styles[this.props.styles.length - 1].photos.length - 1,
        currLastIndex: currLastIndex,
        prevLastIndex: prevLastIndex,
      })
    }
  }

  handleImgClick(x, y) {
    // FUTURE IMPLEMENTATION: Scroll to thumbnail
    let id = `img${x}-${y}`;
    // let dist = (x + 1) * (y + 1);
    // document.getElementById("galleryscroll").scrollTo(document.getElementById(id));
    console.log('style', x);
    console.log('photo', y);
    this.props.changeImg(x, y);
  }

  render() {

    const styles = this.props.styles;
    const currImg = this.props.currImg;

    return (
      <Left style={{alignContent: 'center', minWidth: '400px'}}>
        <div id="gallery" style={{ height: '66vh', minHeight: '350px', overflow: 'hidden' }}>
          <DefaultView
            styles={styles}
            currImg={currImg}
            lastImgIndex={this.state.lastImgIndex}
            lastStyleIndex={this.state.lastStyleIndex}
            currLastIndex={this.state.currLastIndex}
            prevLastIndex={this.state.prevLastIndex}
            handleImgClick={this.handleImgClick}/>
          <GalleryThumbnails
            styles={styles}
            currImg={currImg}
            numImgs={this.state.numImgs}
            handleImgClick={this.handleImgClick}
            id="defaultThumbs"/>
        </div>
      </Left>
    );
  }
}

export default Gallery;