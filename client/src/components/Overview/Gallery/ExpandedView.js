import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { ThemeConsumer } from 'styled-components';
import GalleryThumbnails from './GalleryThumbnails.js';

// import { GalleryModal } from './../../../Styles/Overview';

// Add x in corner to close Modal

const ExpandedView = ({ styles, currImg, isOpen, handleModalOpen, handleImgClick }) => {
  const [zoom, setZoom] = useState(0);
  const [imgTop, setImgTop] = useState(0);
  const [imgLeft, setImgLeft] = useState(0);

  const handleMouseMove = (event) => {

    if (zoom) {
      let y = event.clientY;
      let x = event.clientX;
      let height = document.getElementById("gallerymodal").clientHeight;
      let width = document.getElementById("gallerymodal").clientWidth;

      let top = y / height * 100 * -1
      let left = x / width * 100 * -1
      let cappedTop = top < -100 ? -100: top
      let cappedLeft = left < -100 ? -100: left;

      console.log(`${top}, ${left}`);

      setImgTop(cappedTop);
      setImgLeft(cappedLeft);
    }
  };

  const handleZoom = () => {
    setZoom(!zoom);
    setImgTop(0);
    setImgLeft(0);
  }

  // const overlayStyles = {
  //   zIndex: 10,
  //   background: `rgba${theme.bg.slice(3, -1)}, 0.75)`,
  // };
  const contentStyles = {
    display: 'grid',
    gridAutoRows: '100%',
    gridAutoColumns: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };
  const container = {
    display: 'block',
    width: `${100 * (zoom + 1)}%`,
    height: 'auto',
    margin: 0,
    padding: 0,
    position: 'relative',
    // top: `${imgTop}%`,
    // left: `${imgLeft}%`,
  };
  const scrollImg = {
    width: '100%',
    height: '100%',
  };

  return (
    <ThemeConsumer>
      { theme =>
        <Modal
          id="gallerymodal"
          style={{ overlay: {
            zIndex: 10,
            background: `rgba${theme.bg.slice(3, -1)}, 0.75)`,
          }, content: contentStyles }}
          isOpen={isOpen}
          onRequestClose={() => handleModalOpen(false)}
          appElement={document.getElementById('app')}>
            <div id="expandedGallery" style={container}>
              <img
                onClick={handleZoom}
                onMouseMove={(event) => handleMouseMove(event)}
                style={scrollImg}
                src={styles[currImg[0]].photos[currImg[1]].url} />
            </div>
            {zoom ? null:
              <GalleryThumbnails
              styles={styles}
              currImg={currImg}
              handleImgClick={handleImgClick}
              id="expandedThumbs"/>
            }
        </Modal>
      }
    </ThemeConsumer>
  );
};










// class ExpandedView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       zoom: 0,
//       imgTop: 0,
//       imgLeft: 0,
//     };
//     this.handleZoom = this.handleZoom.bind(this);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//   }

//   handleMouseMove(event) {
//     if (this.state.zoom) {
//       let y = event.clientY;
//       let x = event.clientX;
//       let height = document.getElementById("gallerymodal").clientHeight;
//       let width = document.getElementById("gallerymodal").clientWidth;

//       let top = y / height * 100 * -1
//       let left = x / width * 100 * -1
//       let cappedTop = top < -100 ? -100: top
//       let cappedLeft = left < -100 ? -100: left;

//       console.log(`${top}, ${left}`);
//       this.setState({
//         imgTop: cappedTop,
//         imgLeft: cappedLeft,
//       });
//     }
//   }

//   handleZoom() {
//     this.setState({
//       zoom: !this.state.zoom,
//       imgTop: 0,
//       imgLeft: 0,
//     });
//   }

//   render() {
//     const styles = this.props.styles;
//     const currImg = this.props.currImg;
//     const isOpen = this.props.isOpen;
//     const handleModalOpen = this.props.handleModalOpen;
//     const handleImgClick = this.props.handleImgClick;

//     const theme = useContext(ThemeContext);

//     const overlayStyles = {
//       zIndex: 10,
//       background: theme.bg,
//     }
//     const contentStyles = {
//       display: 'grid',
//       gridAutoRows: '100%',
//       gridAutoColumns: '100%',
//       justifyContent: 'center',
//       alignContent: 'center',
//       margin: 0,
//       padding: 0,
//       overflow: 'hidden',
//     }
//     const container = {
//       display: 'grid',
//       gridAutoRows: '100%',
//       gridAutoColumns: '100%',
//       alignItems: 'center',
//       width: `${100 * (this.state.zoom + 1)}%`,
//       height: `${100 * (this.state.zoom + 1)}%`,
//       margin: 0,
//       padding: 0,
//       position: 'relative',
//       top: `${this.state.imgTop}%`,
//       left: `${this.state.imgLeft}%`,
//     };
//     const scrollImg = {
//       // top: `${this.state.imgTop}%`,
//       // left: `${this.state.imgLeft}%`,
//       objectFit: 'cover',
//       width: '100%',
//       height: '100%',
//       objectPosition: '50% 50%',
//     };

//     return (
//       <Modal
//         id="gallerymodal"
//         style={{ overlay: overlayStyles, content: contentStyles }}
//         isOpen={isOpen}
//         onRequestClose={() => handleModalOpen(false)}
//         appElement={document.getElementById('app')}>
//           <div id="expandedGallery" style={container}>
//             <img
//               onClick={this.handleZoom}
//               onMouseMove={(event) => this.handleMouseMove(event)}
//               style={scrollImg}
//               src={styles[currImg[0]].photos[currImg[1]].url} />
//           </div>
//           {this.state.zoom ? null:
//             <GalleryThumbnails
//             styles={styles}
//             currImg={currImg}
//             handleImgClick={handleImgClick}
//             id="expandedThumbs"/>
//           }
//       </Modal>
//     );
//   }
// }

export default ExpandedView;