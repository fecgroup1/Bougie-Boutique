import React, { Fragment, useState, useEffect, useMemo } from 'react';
import ProductAPI from '../../Utils/ProductAPI';
import Questions from './Questions.js';

const QandA = ({store}) => {
  const [productId, setProductId] = useState(store.state.currentProductId)
  // const [name, setName] = useState('')

  useEffect(() => {
    ProductAPI.getProduct(store.state.currentProductId)
      .then((results) => {
        console.log(store.state.currentProductId)
        console.log(results)
        setProductId(results.currentProductId)
        // setName(results.product.name)
      })
  }, [store.state.currentProductId]);

  if (productId !== undefined) {
    return (<Questions productId={productId}/>)
  } else {
    return <div>Loading!!!</div>
  }

}


export default QandA


