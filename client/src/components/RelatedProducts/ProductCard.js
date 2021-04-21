import React from 'react'
import { ProductCard as StyledProductCard, CardImage } from '../../Styles/'


const ProductCard = ({product}) => {
  let prd = product.product
  return (
    prd
    ?
      <StyledProductCard>
        { product.styles[0].default + '?'
          ? <CardImage src={`${product.styles[0].photos[0].url}`} />
          : <i className="far fa-eye-slash" />
        }
        <div style={{alignSelf: 'end'}}>
          <p style={{margin: 0}}>{prd.category}</p>
          <h4 style={{margin: 0}}>{prd.name}</h4>
          <p style={{margin: 0}}>{`$${product.styles[0].original_price}`}</p>
        </div>
      </StyledProductCard>
    :<StyledProductCard>
      ...loading
    </StyledProductCard>

 )
}

export default ProductCard;