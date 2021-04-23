import React from 'react';
import { Flex } from '../../Styles';

import Gallery from './Gallery.js';
import Styles from './Styles.js';
import Details from './Details.js';

class Overview extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currImg: [0, 0],
      currentProductID: this.props.store.state.currentProductId,
      product: {
        name: null,
        slogan: null,
        description: null,
        category: null,
        features: [
          {
            feature: null,
            value: null,
          }
        ]
      },
      styles: [
        {
          style_id: null,
          name: null,
          original_price: null,
          sale_price: null,
          photos: [
            {
              thumbnail_url: null,
              url: null,
            }
          ],
          skus: [
            {
              quantity: 0,
              size: null,
              sku: null,
            }
          ]
        }
      ],
      meta: {
        starRating: 0,
      },
      reviews: [],
      cart: {},
    }
    this.changeStyle = this.changeStyle.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }

  componentDidMount() {
    this.props.store.setProduct();
  }

  changeStyle(index) {
    console.log('changStyle index: ', index);
    this.setState({
      currImg: [index, 0]
    });
    // this.props.store.changeStyle(index);
  }

  changeImg(style, index) {
    this.setState({
      // currStyle: this.state.currImg[0],
      currImg: [style, index]
    });
  }

  render () {

    var store = this.props.store.state.styles === undefined ? this.state: this.props.store.state;
    var metaStore = store.meta === undefined ? this.state.meta: store.meta;
    var reviewsStore = store.reviews === undefined? this.state.reviews: store.reviews;

    return (
      <div id="overview">
        <Flex>
          <Gallery
            styles={store.styles}
            currImg={this.state.currImg}
            changeImg={this.changeImg} />
          <Styles
            store={store}
            product={store.product}
            currStyle={this.state.currImg[0]}
            changeStyle={this.changeStyle}
            styles={store.styles}
            stars={metaStore.starRating}
            reviews={reviewsStore.length}
            cart={store.cart}
            setCart={this.props.store.setCart}/>
        </Flex>
          <Details
            slogan={store.product.slogan}
            description={store.product.description}
            features={store.product.features}/>
      </div>
    );
  }
}

export default Overview;