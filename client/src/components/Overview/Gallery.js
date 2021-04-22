import React from 'react';
import { Left, GallThumb, CurrGallThumb} from './../../Styles';

class Gallery extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   currImg: this.props.currImg,
    // }
    // this.changeImg = this.changeImg.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.currImg[0] !== nextProps.currImg[0]) {
  //     return true;
  //   }
  //   if (this.props.styles[0].style_id !== nextProps.styles[0].style_id) {
  //     return true;
  //   }
  //   if (this.state.currImg[0] !== nextState.currImg[0]){
  //     return true;
  //   }
  //   if (this.state.currImg[1] !== nextState.currImg[1]){
  //     return true;
  //   }
  //   return false;
  // }

  // changeImg(style, index) {
  //   if (this.state.currImg[0] !== style) {
  //     this.props.changeImg(style, index);
  //   } else {
  //     this.setState({
  //       currImg: [style, index]
  //     });
  //   }
  // }

  render() {
    const changeImg = this.props.changeImg;
    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const galImg = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '100%',
      height: '100%'
    };
    const gallerythumbs = {
      whiteSpace: 'wrap',
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: 'auto',
    };
    const container = {
      appearance: 'none',
      overflow: 'hidden',
      display: 'grid',
      position: 'absolute',
      top: '100px',
      left: '20px',
      width: '9vh',
      height: '64vh',
      margin: '1vh',
      justifyItems: 'center',
    };
    const thumb = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '6vh',
      height: '6vh',
    }

    return (
      <Left style={{alignContent: 'center'}}>
        <div id="gallery" style={{height: '66vh'}}>
          <img
            style={galImg}
            src={styles[currImg[0]].photos[currImg[1]].url}/>
          <div style={container}>
            <div id="gallerythumbs" style={gallerythumbs}>
              {styles.map((style, sIndex) => {
                return style.photos.map((photo, pIndex) => {
                  if ((sIndex === currImg[0]) &&
                      (pIndex === currImg[1])) {
                      return <CurrGallThumb
                        style={thumb}
                        key={[sIndex, pIndex]}
                        src={photo.thumbnail_url} />
                  } else {
                    return <GallThumb
                      style={thumb}
                      key={[sIndex, pIndex]}
                      src={photo.thumbnail_url}
                      onClick={() => {changeImg(sIndex, pIndex)}} />
                  }
                })
              })}
            </div>
          </div>
        </div>
      </Left>
    );
  }
}

export default Gallery;