import React, { useState, useEffect, Fragment} from 'react'
import { StyledProductCard, CardImage,  ActionButton, StarsDisplay } from '../../Styles/'

const ProductCard = ({product, buttonAction, buttonType, changeProduct, button, cursor, addedClasses, relatedProduct, theme, id}) => {
  let prd = product.product
  const [actionProduct, setActionProduct] = useState()

  useEffect(() => {
    if (relatedProduct) {
      setActionProduct(product.product)
    } else {
      setActionProduct(product)
    }
  }, [product])

  return (
    prd
    ?
      <StyledProductCard
        className={addedClasses}
        aria-label="productCard"
        alt={`${prd.name} product-card`}
      >
        <ActionButton
          onClick={() => buttonAction(actionProduct, event)}
          cursor={cursor}
          alt={`${id} action button`}
          aria-label={`${id} action button`}
        >
          <i className={`lni lni-32 ${buttonType}`} />
        </ActionButton>

        {
          product.styles[0].photos[0].url !== null
          ? <CardImage
              src={`${product.styles[0].photos[0].url}`}
              onClick={()=> changeProduct(product.currentProductId)}
            />
          : <CardImage
              src={'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'}
              onClick={()=> changeProduct(product.currentProductId)}
            />
        }

        <div style={{borderTop: `1px solid ${theme.bluGry}`, paddingLeft: '.5em' }}>
          <p style={{marginBottom: 0}}>{prd.category}</p>
          <h4 style={{margin: 0}}>{prd.name}</h4>
          <p style={{marginTop: 0}}>{`$${product.styles[0].original_price}`}</p>
          <StarsDisplay rating={product.meta.starRating}/>
        </div>
      </StyledProductCard>
    :<StyledProductCard
    alt="palceholder product-card"
    >
      <ActionButton>
      <i className="lni lni-32 lni-pagination" />
      </ActionButton>
      <div style={{alignSelf: 'center', placeSelf: 'center'}}>
      <i
        className="lni lni-spinner-arrow lni-is-spinning"
        aria-label="spinner"
        style={{color: `${theme.bluGry}`, fontSize:'5em'}}
      />
      </div>
      <div style={{borderTop: `1px solid ${theme.bluGry}`, paddingLeft: '.25em', transition: 'background 0.5s'}}>
        <div style={{marginTop: '2em', marginBottom: 0, backgroundColor: '#cccccc', width: '80%', height: '1em'}}></div>
        <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
        <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
        <StarsDisplay rating={3}/>
      </div>
    </StyledProductCard>

 )
}

export default ProductCard;