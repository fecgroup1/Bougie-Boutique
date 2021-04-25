import React, { Fragment, useState, useEffect, useMemo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper, Button, StarsInner, StarsOuter, StyledProductCard, AddOutfitButton } from '../../Styles';
import ProductCard from './ProductCard.js'
import CompareModal from './CompareModal.js'

const RelatedProducts = ({store, theme}) => {

  const [products, setProducts] = useState([1, 2, 3, 4]);
  const [productsPosition, setProductsPosition] = useState({left: false, right: true, position: 0});
  const [outfitsPosition, setOutfitPosition] = useState({left: false, right: true, position: 0});
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
    if (saved) {
      setOutfits(saved);
    }
  }, [])

  useEffect(() => {
    if (productsPosition.position === 0) {
      console.log('prodPos', productsPosition)
      let temp = {...productsPosition}
      temp.left = false
      setProductsPosition(temp)
    }
    if (productsPosition.position > 0) {
      let temp = {...productsPosition}
      temp.left = true
      setProductsPosition(temp)
    }
    if (outfitsPosition.position === 0) {
      console.log('outPos', productsPosition)
      let temp = {...productsPosition}
      temp.left = false
      setProductsPosition(temp)
    }
    if (productsPosition.position > 0) {
      let temp = {...productsPosition}
      temp.left = true
      setProductsPosition(temp)
    }
  }, [])

  const scroll = (container, direction, event) => {
    let area = event.target.parentNode.parentNode.children[1];
    let cardWidth = event.target.parentNode.parentNode.children[1].children[1].clientWidth;
    if(direction === 'left' ) {
      // console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft += cardWidth
      console.log('scroll value: ', area.scrollLeft)
      console.log('client width value: ', area.clientWidth)
      let temp = {...productsPosition}
      temp.position = area.scrollLeft
      setProductsPosition(temp)

    } else {
      // console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft -= cardWidth
      console.log('scroll value: ', area.scrollLeft)
      console.log('client width value: ', area.clientWidth)
      let temp = {...productsPosition}
      temp.position = area.scrollLeft
      setProductsPosition(temp)
    }
  }

  const handleComparison = (product) => {
    setComparisonProduct(product)
  }

  const handleSaveOutfit = (product) => {
    let newState = {...outfits};
    newState[product.currentProductId] = product;
    setOutfits(newState);
    window.localStorage.removeItem('bougieBoutiqueOutfits');
    window.localStorage.setItem('bougieBoutiqueOutfits', JSON.stringify(newState));
  }

  const handleRemoveOutfit = (product) => {
    let newState = {...outfits};
    delete newState[product.currentProductId];
    setOutfits(newState);
    window.localStorage.removeItem('bougieBoutiqueOutfits');
    window.localStorage.setItem('bougieBoutiqueOutfits', JSON.stringify(newState));
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
          show={productsPosition.left}
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
                key={'relatedproduct' + index}
                theme={theme}
                product={product}
                className={'productCard'}
                changeProduct={store.changeProduct}
                buttonAction={setComparisonProduct}
                buttonType={'lni-pagination'}
                cursor={'compare'}
                relatedProduct={true}
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

    , [store.state.currentProductId, products, productsPosition])

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
                key={'outfit' + index}
                theme={theme}
                product={outfits[product]}
                className={'productCard'}
                buttonAction={handleRemoveOutfit}
                changeProduct={store.changeProduct}
                buttonType={'lni-cross-circle'}
                cursor={'delete'}
                addedClasses={'outfit'}
                relatedProduct={false}
              />
            ))
          }
        </CardContainer>
      </CardsWrapper>

    </ProductsContainer>

  , [outfits])


    return (
      <Fragment>
        <section tracking={'Related Products'}>
          <RelatedContainer>
            {relatedSection}
            {outfitSection}
          </RelatedContainer>
          <CompareModal
            product={store.state.product}
            comparisonProduct={comparisonProduct}
            resetCompare={setComparisonProduct}
          />
         </section>
    </Fragment>
    )
}


export default RelatedProducts;