import React, { useState } from 'react';
import ExpandedView from './ExpandedView.js';
import ScrollButtons from './ScrollButtons.js';
import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

const DefaultView = ({ styles, currImg, lastImgIndex, lastStyleIndex, currLastIndex, prevLastIndex, handleImgClick, galHeight, galWidth, galLeft, galTop, buttonHeight, buttonWidth, numImgs }) => {
  // STATE
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleModalOpen = (bool) => {
    if (bool) {
      var pos = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${pos}px`;
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scroll({ top: scrollY })
    }
    setModalOpen(bool);
    setScrollY(pos);
  }

  if (styles[0].name === null) {
    return (
      <Loading
        src={styles[currImg[0]].photos[currImg[1]].url} />
    );
  } else if (styles[currImg[0]].photos[currImg[1]].url === null) {
    return (
      <>
        <ScrollButtons
          currImg={currImg}
          lastImgIndex={lastImgIndex}
          lastStyleIndex={lastStyleIndex}
          currLastIndex={currLastIndex}
          prevLastIndex={prevLastIndex}
          handleImgClick={handleImgClick}
          galHeight={galHeight}
          galWidth={galWidth}
          galLeft={galLeft}
          galTop={galTop}
          buttonHeight={buttonHeight}
          buttonWidth={buttonWidth} />
        <MainNull
          src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'/>
      </>
    );
  } else {
    return (
      <>
        <ScrollButtons
          currImg={currImg}
          lastImgIndex={lastImgIndex}
          lastStyleIndex={lastStyleIndex}
          currLastIndex={currLastIndex}
          prevLastIndex={prevLastIndex}
          handleImgClick={handleImgClick}
          galHeight={galHeight}
          galWidth={galWidth}
          galLeft={galLeft}
          galTop={galTop}
          buttonHeight={buttonHeight}
          buttonWidth={buttonWidth} />
        <MainImg
          onClick={() => handleModalOpen(true)}
          src={styles[currImg[0]].photos[currImg[1]].url}/>
        <ExpandedView
          isOpen={modalOpen}
          styles={styles}
          currImg={currImg}
          numImgs={numImgs}
          handleModalOpen={handleModalOpen}
          handleImgClick={handleImgClick}/>
    </>
    );
  }
};

// class DefaultView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       modalOpen: false,
//       scrollY: 0,
//     }
//     this.handleModalOpen = this.handleModalOpen.bind(this);
//   }

//   handleModalOpen(bool) {
//     if (bool) {
//       var pos = window.scrollY;
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${pos}px`;
//     } else {
//       document.body.style.position = '';
//       document.body.style.top = '';
//       window.scroll({ top: this.state.scrollY })
//     }
//     this.setState({
//       modalOpen: bool,
//       scrollY: pos,
//     });
//   }

//   render() {
//     const styles = this.props.styles;
//     const currImg = this.props.currImg;
//     const lastImgIndex = this.props.lastImgIndex;
//     const lastStyleIndex = this.props.lastStyleIndex;

//     if (styles[0].name === null) {
//     return (
//       <Loading
//         src={styles[currImg[0]].photos[currImg[1]].url} />
//     );
//     } else if ( styles[currImg[0]].photos[currImg[1]].url === null) {
//       return (
//         <>
//           <ScrollButtons
//             currImg={currImg}
//             lastImgIndex={lastImgIndex}
//             lastStyleIndex={lastStyleIndex}
//             currLastIndex={this.state.currLastIndex}
//             handleImgClick={this.props.handleImgClick}
//             handleModalOpen={this.handleModalOpen}/>
//           <MainNull
//             src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'/>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <ScrollButtons
//             currImg={currImg}
//             lastImgIndex={lastImgIndex}
//             lastStyleIndex={lastStyleIndex}
//             currLastIndex={this.state.currLastIndex}
//             handleImgClick={this.props.handleImgClick}
//             handleModalOpen= {this.handleModalOpen}/>
//           <MainImg
//             onClick={() => this.handleModalOpen(true)}
//             src={styles[currImg[0]].photos[currImg[1]].url}/>
//           <ExpandedView
//             isOpen={this.state.modalOpen}
//             styles={styles}
//             currImg={currImg}
//             handleModalOpen={this.handleModalOpen}
//             handleImgClick={this.props.handleImgClick}/>
//       </>
//       );
//     }
//   }
// };

export default DefaultView;