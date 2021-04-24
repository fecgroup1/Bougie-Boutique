import React from 'react';
import ExpandedView from './ExpandedView.js';
import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      modalOpen: false,
      scrollY: 0,
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }

  handleModalOpen(bool) {
    if (bool) {
      var pos = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${pos}px`;
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scroll({ top: this.state.scrollY })
    }
    this.setState({
      modalOpen: bool,
      scrollY: pos,
    });
  }

  render() {
    const styles = this.props.styles;
    const currImg = this.props.currImg;

    if (styles[0].name === null) {
    return (
      <Loading
        src={styles[currImg[0]].photos[currImg[1]].url} />
    );
    } else if ( styles[currImg[0]].photos[currImg[1]].url === null) {
      return (
        <MainNull
          src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'/>
      );
    } else {
      return (
        <>
          <MainImg
            onClick={() => this.handleModalOpen(true)}
            src={styles[currImg[0]].photos[currImg[1]].url}/>
          <ExpandedView
            isOpen={this.state.modalOpen}
            styles={styles}
            currImg={currImg}
            handleModalOpen={this.handleModalOpen} />
      </>
      );
    }
  }
};

export default DefaultView;