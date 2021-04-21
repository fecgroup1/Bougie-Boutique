import React from 'react'
import { ProductCard as StyledProductCard, CardImage,  StarsOuter, StarsInner } from '../../Styles/'


const ProductCard = ({product}) => {
  let prd = product.product
  return (
    prd
    ?
      <StyledProductCard>
        { product.styles[0].photos[0].url !== null
          ? <CardImage src={`${product.styles[0].photos[0].url}`} />
          : <CardImage src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'} />
        }
        <div style={{alignSelf: 'end', borderTop: '1px solid black' }}>
          <p style={{marginBottom: 0}}>{prd.category}</p>
          <h4 style={{margin: 0}}>{prd.name}</h4>
          <p style={{marginTop: 0}}>{`$${product.styles[0].original_price}`}</p>
          <StarsOuter
            color={'#002a60'}
          >
            <StarsInner
              rating={3}
              color={'#002a60'}
            />
          </StarsOuter>
        </div>
      </StyledProductCard>
    :<StyledProductCard>
      <div style={{alignSelf: 'center', placeSelf: 'center'}}>
        ...loading
      </div>
      <div style={{alignSelf: 'end', borderTop: '1px solid black', paddingLeft: '.25em' }}>
          <div style={{marginTop: '.2em', marginBottom: 0, backgroundColor: '#cccccc', width: '80%', height: '1em'}}></div>
          <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
          <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
          <StarsOuter
            color={'#cccccc'}
          >
            <StarsInner
              rating={3}
              color={'#cccccc'}
            />
          </StarsOuter>
        </div>
    </StyledProductCard>

 )
}

export default ProductCard;