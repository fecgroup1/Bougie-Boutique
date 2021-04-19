import React from 'react'
import RelatedAPI from '../../Utils/RelatedAPI'
// import WidgetContainer from '../../Styles'
// import ProductCard from './ProductCard.js'

class RelatedProducts extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const appStore = this.props.store.state;
    console.log('we have arrived', appStore)
    return (
      <div> btw I'm a Class related component {appStore.currentProductId}</div>
    )
  }
}


export default RelatedProducts;