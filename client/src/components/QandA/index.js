import React, { Fragment, useState, useEffect, useMemo } from 'react';
import ProductAPI from '../../Utils/ProductAPI';
import Questions from './Questions.js';
import QABody from '../../Styles'

const QandA = ({store}) => {
  const [productId, setProductId] = useState(store.state.currentProductId)
  const [product, setProduct] = useState(store.state.product)

  useEffect(() => {
    setProductId(store.state.currentProductId)
    setProduct(store.state.product)
  }, [store.state.currentProductId, store.state.product]);

  if (productId !== undefined) {
    return (<Questions productId={productId} product={product}/>)
  } else {
    return <div>Loading!!!</div>
  }

}


export default QandA


