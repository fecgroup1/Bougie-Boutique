import React from 'react';
import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

class DefaultView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      modalOpen: false,
    }
    this.handleModel = this.handleModel.bind(this);
  }

  handleModel(bool) {
    this.setState({
      modalOpen: bool,
    });
  }

  render() {
    const styles = this.props.styles;
    const currImg = this.props.currImg;

    if (styles[0].name === null) {
    return (
      <Loading
        src={styles[currImg[0]].photos[currImg[1]].url} />
      <ExpandedView
        isOpen={this.state.modalOpen}
        handleModel={this.handleModel} />
    );
    } else if ( styles[currImg[0]].photos[currImg[1]].url === null) {
      return (
        <MainNull
          onClick={() => this.handleModel(true)}
          src='https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/circle-minus.svg'/>
        <ExpandedView
          isOpen={this.state.modalOpen}
          handleModel={this.handleModel} />
      );
    } else {
      return (
        <MainImg
          src={styles[currImg[0]].photos[currImg[1]].url}/>
        <ExpandedView
          isOpen={this.state.modalOpen}
          handleModel={this.handleModel} />
      );
    }
  }
};

export default DefaultView;