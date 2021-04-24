import React, { Fragment, useState, useEffect, useMemo } from 'react';
import ProductAPI from '../../Utils/ProductAPI';
import Questions from './Questions.js';

const QandA = ({store}) => {
  const [productId, setProductId] = useState(store.state.currentProductId)
  const [name, setName] = useState('')

  useEffect(() => {
    ProductAPI.getProduct(store.state.currentProductId)
      .then((results) => {
        setProductId(results.currentProductId)
        setName(results.product.name)
      })
  }, [store.state.currentProductId]);

  if (productId !== undefined) {
    return (<Questions productId={productId} name={name}/>)
  } else {
    return <div>Loading!!!</div>
  }

}


export default QandA


