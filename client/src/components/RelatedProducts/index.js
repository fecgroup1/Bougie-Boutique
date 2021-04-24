import React, { Fragment, useState, useEffect, useMemo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper, Button, StarsInner, StarsOuter, StyledProductCard, AddOutfitButton } from '../../Styles';
import ProductCard from './ProductCard.js'
import CompareModal from './CompareModal.js'

const RelatedProducts = ({store, theme}) => {

  const [products, setProducts] = useState([1, 2, 3, 4]);
  const [productsPosition, setProductsPosition] = useState(0);
  const [comparisonProduct, setComparisonProduct] = useState(null);
  const [outfits, setOutfits] = useState({})

  //grabs related products when the current productId is initally set/changed
  useEffect(() => {
    RelatedAPI.getRelatedProducts(store.state.currentProductId)
      .then((results) => {
        setProducts(results)
      })

  }, [store.state.currentProductId]);

  //check local storage on initial render
  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem('bougieBoutiqueOutfits'))
    console.log('saved outfits', saved)
    if (saved) {
      setOutfits(saved);
    }
  }, [])

  const scroll = (container, direction, event) => {
    let area = event.target.parentNode.parentNode.children[1];
    let cardWidth = event.target.parentNode.parentNode.children[1].children[1].clientWidth;
    if(direction === 'left' ) {
      // console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft += cardWidth
      if (productsPosition === `${container}`.length - 3) {

      } else {
        setProductsPosition(productsPosition + 1);
      }
    } else {
      // console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft -= cardWidth
      setProductsPosition(productsPosition - 1)
    }
  }

  const handleSaveOutfit = (product) => {
    outfits[product.currentProductId] = product;
    console.log('outfits?', outfits)
    window.localStorage.removeItem('bougieBoutiqueOutfits');
    window.localStorage.setItem('bougieBoutiqueOutfits', JSON.stringify(outfits));
  }

  const handleRemoveOutfit = (product) => {
    delete outfits[product.currentProductId];
    window.localStorage.removeItem('bougieBoutiqueOutfits');
    window.localStorage.setItem('bougieBoutiqueOutfits', JSON.stringify(outfits));
  }

  //memoizes the props in this componenet and only updates them when the array values are updated [currentProdID, products]
  const relatedSection = useMemo(() =>
    <ProductsContainer
    key={'relatedProductsContainer'}
    items={products.length}
    >
      <div>
        <h3>RELATED PRODUCTS</h3>
      </div>
      <CardsWrapper>
        <Button
          // onClick={(event) => scroll('products', 'right', event)}
          show={!!productsPosition}
          position={'left'}
        >
          <i className="lni lni-32 lni-chevron-left-circle"
          style={{padding: '30px 20px',
            opacity: '.75',
            backgroundColor: 'white'}}
          onClick={(event) => scroll('products', 'right', event)}
          ></i>
        </Button>
        <CardContainer>
          {
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                className={'productCard'}
                changeProduct={store.changeProduct}
                buttonAction={setComparisonProduct}
                buttonType={'lni-pagination'}
                cursor={'compare'}
              />
            ))
          }
        </CardContainer>
          <Button
            // onClick={(event) => scroll('products', 'left', event)}
            show={true}
            position={'right'}
          >
            <i className="lni lni-32 lni-chevron-right-circle"
            style={{padding: '30px 20px',
            opacity: '.75',
            backgroundColor: 'white'}}
            onClick={(event) => scroll('products', 'left', event)}
            />
          </Button>
      </CardsWrapper>
    </ProductsContainer>

    , [store.state.currentProductId, products])

  //memoizes the props in this componenet and only updates them when the array values are updated [outfits]
  const outfitSection = useMemo(() =>
    <ProductsContainer
    key={'outfitProductsContainer'}
    >
      <div>
        <h3>YOUR OUTFIT</h3>
      </div>
      <CardsWrapper>
      <CardContainer>
        <StyledProductCard
          className={'addOutfit'}
        >
        <AddOutfitButton
        onClick={() => handleSaveOutfit(store.state)}
        >
          <i
            style={{
              fontSize: '9em',
              color: theme.bluGry
            }}
            className="lni lni-circle-plus plus"
          />
        </AddOutfitButton>
        </StyledProductCard>
          {
            Object.keys(outfits).map((product, index) => (
              <ProductCard
                key={index}
                product={outfits[product]}
                className={'productCard'}
                buttonAction={handleRemoveOutfit}
                buttonType={'lni-cross-circle'}
                cursor={'delete'}
              />
            ))
          }
        </CardContainer>
      </CardsWrapper>

    </ProductsContainer>

  , [outfits])

    return (
      <Fragment>
        <RelatedContainer>
          {relatedSection}
          {outfitSection}
        </RelatedContainer>
        <CompareModal
          product={store.state.product}
          comparisonProduct={comparisonProduct}
          resetCompare={setComparisonProduct}
         />
    </Fragment>
    )
}


export default RelatedProducts;