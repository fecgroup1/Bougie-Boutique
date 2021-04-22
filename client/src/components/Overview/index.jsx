import React from 'react';
import { Flex } from '../../Styles';

import Gallery from './Gallery.js';
import Styles from './Styles.js';
import Details from './Details.js';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currImg: [0, 0]
    }
    this.changeStyle = this.changeStyle.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }

  changeStyle(index) {
    console.log('changStyle index: ', index);
    this.setState({
      currImg: [index, 0]
    });
    this.props.store.changeStyle(index);
  }

  changeImg(style, index) {
    this.setState({
      currStyle: this.props.store.state.styles[style],
      currImg: [style, index]
    });
  }

  render () {

    if (this.props.store.state.styles !== undefined) {
      var store = this.props.store.state
      return (
        <div id="overview">
          <Flex>
            <Gallery
              styles={store.styles}
              currImg={this.state.currImg}
              changeImg={this.changeImg} />
            <Styles
              product={store.product}
              currStyle={store.currStyle}
              changeStyle={this.changeStyle}
              styles={store.styles}
              stars={store.meta.starRating}
              reviews={store.reviews.length}
              cart={store.cart}
              updateCart={this.props.store.updateCart}/>
          </Flex>
            <Details
              slogan={store.product.slogan}
              description={store.product.description}
              features={store.product.features}/>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

export default Overview;