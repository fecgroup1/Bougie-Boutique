import React, { Fragment, useState, useEffect, useMemo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper, Button, StyledProductCard, AddOutfitButton } from '../../Styles';
import ProductCard from './ProductCard.js'
import CompareModal from './CompareModal.js'
import { act } from 'react-dom/test-utils';

const RelatedProducts = ({store, theme}) => {

  const [products, setProducts] = useState([1, 2, 3, 4]);
  const [relatedSuccess, setRelatedSuccess] = useState(true);
  const [productsPosition, setProductsPosition] = useState(0);
  const [productScroll, setProductScroll] = useState({left: false, right: true});
  const [outfitsPosition, setOutfitPosition] = useState(0);
  const [outfitScroll, setOutfitScroll] = useState({left: false, right: true});
  const [comparisonProduct, setComparisonProduct] = useState(null);
  const [outfits, setOutfits] = useState({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    let outfitWidth = document.getElementById('outfitsWrapper').clientWidth

    if(outfitWidth + 350 < screenWidth) {
      setOutfitScroll({
        ...outfitScroll,
        right: false
      })
    } else if (outfitWidth + 350 > screenWidth) {
      setOutfitScroll({
        ...outfitScroll,
        right: true
      })
    }

  }, [outfits, screenWidth])

  useEffect(() => {
    let productWidth = document.getElementById('productsWrapper').clientWidth

    if(productWidth + 150 < screenWidth) {
      setProductScroll({
        ...productScroll,
        right: false,
      })
    } else if (productWidth + 150 > screenWidth) {
      setProductScroll({
        ...productScroll,
        right: true,
      })
    }

  }, [screenWidth])

  //grabs related products when the current productId is initally set/changed
  useEffect(async () => {
    try {
      const results = await store.getRelated();
      setProducts(results);
    } catch (e) {
      setRelatedSuccess(false)
    }
  }, [store.state.currentProductId]);

  //check local storage on initial render
  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem('bougieBoutiqueOutfits'))
    if (saved) {
      setOutfits(saved);
    }
    // setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  //manage button scroll visibility products
  useEffect(() => {
    if (productsPosition <= 0) {
      let temp = {...productScroll}
      temp.left = false
      setProductScroll(temp)
    } else if (productsPosition > 0) {
      let temp = {...productScroll}
      temp.left = true
      setProductScroll(temp)
    }
  }, [productsPosition]);

  //manage button scroll visibility for outfits
  useEffect(() => {
    if (outfitsPosition <= 0) {
      let temp = {...outfitScroll}
      temp.left = false
      setOutfitScroll(temp)
    } else if (outfitsPosition > 0) {
      let temp = {...outfitScroll}
      temp.left = true
      setOutfitScroll(temp)
    }
  }, [outfitsPosition]);

  const scroll = (container, direction, event) => {
    let area = event.target.parentNode.parentNode.children[1];
    let cardWidth = event.target.parentNode.parentNode.children[1].children[1].clientWidth;

    if(direction === 'right' ) {
      area.scrollLeft += cardWidth
      let pos = area.scrollLeft + cardWidth
      container === 'products' ?  setProductsPosition(pos) : setOutfitPosition(pos);

    } else {
      area.scrollLeft -= cardWidth
      let pos = area.scrollLeft - cardWidth
      container === 'products' ?  setProductsPosition(pos) : setOutfitPosition(pos);
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

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  }

  //memoizes the props in this componenet and only updates them when the array values are updated [currentProdID, products]
  const relatedSection = useMemo(() =>
    <ProductsContainer
    key={'relatedProductsContainer'}
    items={products.length}
    >
      <div>
        <h2>RELATED PRODUCTS</h2>
      </div>
      <CardsWrapper
        id='productsWrapper'
      >
        <Button
          show={productScroll.left}
          position={'left'}
        >
          <i className="lni lni-32 lni-chevron-left"
          style={{padding: '50px 10px',
            opacity: '.75',
            backgroundColor: 'white'}}
          onClick={(event) => scroll('products', 'left', event)}
          ></i>
        </Button>
        <CardContainer>
          {
            products.map((product, index) => (
              <ProductCard
                key={'relatedproduct' + index}
                id={'relatedproduct' + index}
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
            show={productScroll.right}
            position={'right'}
          >
            <i className="lni lni-32 lni-chevron-right"
            style={{padding: '50px 10px',
            opacity: '.75',
            backgroundColor: 'white'}}
            onClick={(event) => scroll('products', 'right', event)}
            />
          </Button>
      </CardsWrapper>
    </ProductsContainer>

    , [store.state.currentProductId, products, productScroll])

  //memoizes the props in this componenet and only updates them when the array values are updated [outfits]
  const outfitSection = useMemo(() =>
    <ProductsContainer
    key={'outfitProductsContainer'}
    >
      <div>
        <h3>YOUR OUTFIT</h3>
      </div>
      <CardsWrapper
        id='outfitsWrapper'
      >
      <Button
            show={outfitScroll.left}
            position={'left'}
          >
            <i className="lni lni-32 lni-chevron-left"
            style={{padding: '50px 10px',
            opacity: '.75',
            backgroundColor: 'white'}}
            onClick={(event) => scroll('outfits', 'left', event)}
            />
          </Button>
      <CardContainer>
        <StyledProductCard
          className={'addOutfit'}
        >
        <AddOutfitButton
        onClick={() => handleSaveOutfit(store.state)}
        >
          <i
            className="lni lni-circle-plus plus"
            style={{
              fontSize: '9em',
              color: theme.bluGry || blue,
              boxShadow: `10px 10px 15px #cccccc`,
              borderRadius: '500px'
            }}

          />
        </AddOutfitButton>
        </StyledProductCard>
          {
            Object.keys(outfits).map((product, index) => (
              <ProductCard
                key={'outfit' + index}
                id={'outfit' + index}
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
        <Button
            // onClick={(event) => scroll('products', 'left', event)}
            show={outfitScroll.right}
            position={'right'}
          >
            <i className="lni lni-32 lni-chevron-right"
            style={{padding: '50px 10px',
            opacity: '.75',
            backgroundColor: 'white'}}
            onClick={(event) => scroll('outfits', 'right', event)}
            />
          </Button>
      </CardsWrapper>

    </ProductsContainer>

  , [outfits, outfitScroll, theme])


    return (
      <Fragment>
        <section tracking={'Related Products'}>
          <RelatedContainer>
            {
              relatedSuccess ? relatedSection : <h2 alt='error loading products'>Error Loading Related Products</h2>
            }
            {outfitSection}
          </RelatedContainer>
          <CompareModal
            product={store.state.product}
            comparisonProduct={comparisonProduct}
            resetCompare={setComparisonProduct}
            theme={theme}
          />
         </section>
    </Fragment>
    )
}


export default RelatedProducts;