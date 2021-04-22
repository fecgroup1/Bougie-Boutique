import React from 'react';
import { Left, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer} from './../../Styles';

class Gallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      position: '0px',
    };
  }

  clickUp() {

  }

  clickDown() {

  }

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
    // const gallerythumbs = {
    //   whiteSpace: 'wrap',
    //   display: 'grid',
    //   gridTemplateColumns: '100%',
    //   gridTemplateRows: 'auto',
    //   scrollSnapType: 'y mandatory',
    //   overflowY: 'auto',
    //   cursor: 'all-scroll',
    //   -ms-overflow-style: 'none',
    // };
    const position = {
      transform: `translateY(${this.state.position})`,
    }
    const container = {
      display: 'grid',
      height: '56.5vh',
      margin: '4.75vh 1vw',
      justifyItems: 'center',
      background: 'none',
    };
    const bg = {
      opacity: '0.5',
    };
    const thumb = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '6vh',
      height: '6vh',
      scrollSnapAlign: 'start',
    }
    const buttonContainer = {
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      justifyContent: 'space-between',
      alignContent: 'space-between',

    }

    return (
      <Left style={{alignContent: 'center', minWidth: '400px'}}>
        <div id="gallery" style={{height: '66vh'}}>
          <img
            style={galImg}
            src={styles[currImg[0]].photos[currImg[1]].url}/>
          <GallThumbContainer style={bg}></GallThumbContainer>
          <GallThumbContainer style={buttonContainer}>
            <GalleryScroll>
              <i className="lni lni-chevron-up-circle"></i>
            </GalleryScroll>
            <GalleryScroll>
              <i className="lni lni-chevron-down-circle"></i>
            </GalleryScroll>
          </GallThumbContainer>
          <GallThumbContainer style={container}>
            <NoScrollBar style={position}>
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
            </NoScrollBar>
          </GallThumbContainer>
        </div>
      </Left>
    );
  }
}

export default Gallery;