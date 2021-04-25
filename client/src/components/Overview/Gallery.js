import React from 'react';
import DefaultView from './Gallery/DefaultView.js';
import GalleryThumbnails from './Gallery/GalleryThumbnails.js';
import { Left } from './../../Styles/Overview';

class Gallery extends React.Component {
  constructor (props) {
    super(props);
    this.handleImgClick = this.handleImgClick.bind(this);
  }

  handleImgClick(x, y) {
    // FUTURE IMPLEMENTATION: Scroll to thumbnail
    let id = `img${x}-${y}`;
    // let dist = (x + 1) * (y + 1);
    // document.getElementById("galleryscroll").scrollTo(document.getElementById(id));
    this.props.changeImg(x, y);
  }

  render() {

    const styles = this.props.styles;
    const currImg = this.props.currImg;

    return (
      <Left style={{alignContent: 'center', minWidth: '400px'}}>
        <div id="gallery" style={{ height: '66vh', overflow: 'hidden' }}>
          <DefaultView
            styles={styles}
            currImg={currImg}
            handleImgClick={this.handleImgClick}/>
          <GalleryThumbnails
            styles={styles}
            currImg={currImg}
            handleImgClick={this.handleImgClick}
            id="defaultThumbs"/>
        </div>
      </Left>
    );
  }
}

export default Gallery;