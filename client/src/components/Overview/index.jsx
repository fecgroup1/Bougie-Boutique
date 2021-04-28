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
        name: 'Loading...',
        slogan: 'Loading...',
        description: null,
        category: null,
        features: []
      },
      styles: [
        {
          style_id: null,
          name: null,
          original_price: '0.00',
          sale_price: null,
          photos: [
            {
              thumbnail_url: 'https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/spinner.svg',
              url: 'https://lineicons.com/wp-content/themes/xt-lineicons/free-regular-icons/spinner.svg',
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
      cart: this.props.store.state.cart,
    }
    this.changeStyle = this.changeStyle.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount in Overview');
    const param = (new URL(document.location)).searchParams.get('pid');
    if (param !== null) {
      let pid = param.replace(/\D/g, '');
      let id = (pid === null || pid === undefined) ? this.props.currentProductID: pid;
      console.log('calling setProduct with', id);
      this.props.store.setProduct(id);
    } else {
      this.props.store.setProduct();
    }
  }

  changeStyle(index) {
    console.log('changStyle index: ', index);
    this.props.store.changeImg(index, 0);
  }

  render () {

    var store = this.props.store.state.styles === undefined ? this.state: this.props.store.state;
    var metaStore = store.meta === undefined ? this.state.meta: store.meta;
    var reviewsStore = store.reviews === undefined? this.state.reviews: store.reviews;

    var loading = {
      opacity: this.props.store.state.styles === undefined ?'50%': '',
      marginBottom: '10px',
    };

    return (
      <div id="overview" style={{marginBottom: '10px'}}>
        <Flex className="overviewflex" style={loading}>
          <Gallery
            styles={store.styles}
            currImg={store.currImg}
            changeImg={this.props.store.changeImg} />
          <Styles
            store={store}
            product={store.product}
            currStyle={store.currImg[0]}
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