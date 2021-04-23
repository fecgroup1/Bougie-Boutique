import React, {Fragment} from 'react'
import { StyledProductCard, CardImage,  StarsOuter, StarsInner, CompareButton, NavButton } from '../../Styles/'

const ProductCard = ({product, compareMe, changeProduct}, theme) => {
  let prd = product.product
  return (
    prd
    ?
      <StyledProductCard>
          <CompareButton
            onClick={() => compareMe(prd)}
          >
            <i className="lni lni-32 lni-pagination" />
          </CompareButton>

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
          <StarsOuter
          >
            <StarsInner
              rating={product.meta.starRating}
            />
          </StarsOuter>
        </div>
      </StyledProductCard>
    :<StyledProductCard>
      <CompareButton>
      <i className="lni lni-32 lni-pagination" />
      </CompareButton>
      <div style={{alignSelf: 'center', placeSelf: 'center'}}>
      <i
        className="lni lni-spinner-arrow lni-is-spinning"
        style={{color: `${theme.bluGry}`, fontSize:'5em'}}
      />
      </div>
      <div style={{borderTop: `1px solid ${theme.bluGry}`, paddingLeft: '.25em', transition: 'background 0.5s'}}>
        <div style={{marginTop: '2em', marginBottom: 0, backgroundColor: '#cccccc', width: '80%', height: '1em'}}></div>
        <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
        <div style={{marginTop: '.1em', backgroundColor: '#cccccc', width: '65%', height: '1em'}}></div>
        <StarsOuter
        >
          <StarsInner
            rating={3}
          />
        </StarsOuter>
      </div>
    </StyledProductCard>

 )
}

export default ProductCard;