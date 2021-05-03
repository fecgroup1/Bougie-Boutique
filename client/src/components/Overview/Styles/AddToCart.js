import React from 'react';
import { AddToCartButton, CartDropdown } from './../../../Styles/Overview';
import { ThemeConsumer } from 'styled-components';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSize: 'Select a size',
      quantity: 'Qty: --',
      max: 0,
      totalStock: 0,
      toAdd: 0,
      warningColor: 'red',
      warning: '    ',
      shareHover: false,
    };
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQtySelect = this.handleQtySelect.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
    this.handleShareHover = this.handleShareHover.bind(this);
    this.handleShareView = this.handleShareView.bind(this);
  }

  componentDidMount() {
    this.props.setCart();
  }

  handleSizeSelect(event) {
    event.preventDefault();
    let skus = this.props.styles[this.props.currStyle].skus;
    let quantity = skus[event.target.value].quantity;
    let inCart = Number(window.localStorage.getItem(skus[event.target.value].sku));
    let max = quantity - inCart > 15 ? 15: quantity - inCart;
    let array = [];
    for (let i = 1; i <= max; i++) {
      array.push(i);
    }
    var string = array.length === 0 ? 'Qty: 0': 'Qty: 1';
    this.setState({
      currSize: `Size: ${skus[event.target.value].size}`,
      quantity: string,
      max: array,
      totalStock: quantity,
      toAdd: skus[event.target.value].sku,
      warning: '    ',
      warningColor: '',
    });
  }

  handleQtySelect(event) {
    event.preventDefault();
    this.setState({
      quantity: event.target.value,
    });
  }

  handleAddCart() {
    if (this.state.currSize === 'Select a size') {
      this.setState({
        warning: 'Please select a size',
        warningColor: 'red',
      })
    } else if (this.state.quantity === 'Qty: 0') {
      this.setState({
        warning: 'All available stock in cart',
        warningColor: 'red',
      });
    } else {
      let cart = this.props.cart;
      var cartQty = (cart[this.state.toAdd] === undefined)? 0: cart[this.state.toAdd];
      var addQty = Number(this.state.quantity.slice(5));
      if ( (cartQty + addQty) >= this.state.totalStock) {
        cart[this.state.toAdd] = this.state.totalStock;
      } else if (cartQty > 0) {
        cart[this.state.toAdd] = cartQty + addQty;
      }  else {
        cart[this.state.toAdd] = addQty;
      }
      var newQty = cart[this.state.toAdd];
      var size = this.state.currSize.slice(6);
      var style = this.props.styles[this.props.currStyle].name;
      var title = this.props.title;
      window.localStorage.setItem('cart', JSON.stringify(cart));
      this.props.setCart();
      this.setState({
        currSize: 'Select a size',
        quantity: 'Qty: --',
        max: 0,
        toAdd: 0,
        warning: `${newQty}x ${size} ${title} (${style}) now in cart`,
        warningColor: '',
      });
    }
  }

  handleShareHover() {
    this.setState({
      shareHover: !this.state.shareHover,
    });
  }

  handleShareView() {
    this.setState({
      shareHover: true,
    });
  }

  render() {
    const skus = this.props.styles[this.props.currStyle].skus;
    const grid = {
      display: 'grid',
      gridTemplateAreas: `
        "size size qty qty"
        "warning warning warning warning"
        "cart cart cart share"
      `,
      gridTemplateRows: '45% 10% 45%',
      gridTemplateColumns: 'repeat(4, 24%)',
      columnGap: '5px',
      rowGap: '2px',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      flexGrow: 3,
      marginBottom: '3px',
    }
    const red = {
      color: this.state.warningColor,
      fontSize: '65%',
      gridArea: 'warning',
    }

    const disabled = {
      opacity: '50%',
    }

    if (this.props.outOfStock) {
      return (
        <>
        <div id="addcart" style={grid}>
          <CartDropdown
            readOnly
            id="size"
            style={Object.assign({}, disabled, {gridArea: 'size'})}
            value="Size: --">
              <option value='0' disabled >Size: --</option>
          </CartDropdown>
          <CartDropdown
            readOnly
            id="qty"
            style={Object.assign({}, disabled, {gridArea: 'qty'})}
            value="Qty: --">
              <option value='0' disabled >Qty: --</option>
          </CartDropdown>
        <div style={red}>
          {this.props.styles[0].name === null ? this.state.warning.replace(/ /g, "\u00a0"): 'Out of Stock'}
        </div>
        <AddToCartButton
          style={Object.assign({}, disabled, {gridArea: 'cart'})}
          onClick={this.handleAddCart}>
            Add To Cart
        </AddToCartButton>

        <AddToCartButton
          id="sharebutton"
          onMouseEnter={this.handleShareHover}
          onMouseLeave={this.handleShareHover}
          onClick={this.handleShareOpen}
          style={{ gridArea: 'share', display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.shareHover ? <>
              <span
                className="fb-share-button"
                data-href={(new URL(document.location)).href}data-layout="button_count"
                data-size="small">
                <a
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer"
                  href={this.state.shareHover ? `https://www.facebook.com/sharer/sharer.php?u=${(new URL(document.location)).href};src=sdkpreparse`: ''}
                  className="sharelink fb-xfbml-parse-ignore  lni lni-facebook-filled">
                </a>
              </span>
              <a
                style={{ textDecoration: 'none' }}
                className="sharelink lni lni-twitter-original"
                href={this.state.shareHover ? `https://twitter.com/intent/tweet?text=${(new URL(document.location)).href}`: ''}></a>
              <a
                style={{ textDecoration: 'none' }}
                className="sharelink lni lni-pinterest"
                href={this.state.shareHover ? `https://www.pinterest.com`: ''}></a>
              </>: <i className="sharelink lni lni-telegram-original"></i>}
        </AddToCartButton>

        </div>
        </>
      );
    } else if (this.state.currSize === 'Select a size') {

      return (
        <>
        <div id="addcart" style={grid}>
          <CartDropdown
            style={{ gridArea: 'size' }}
            id="size"
            value={this.state.currSize}
            onChange={(event) => this.handleSizeSelect(event)}>
              <option
                value={this.state.currSize}>
                  {this.state.currSize}
              </option>
              {skus.map((sku, index) => {
                if (sku.quantity > 0) {
                  return (
                    <option
                      key={sku.sku}
                      value={index}>
                        {sku.size}
                    </option>
                  );
                }
              })}
          </CartDropdown>
          <CartDropdown
            style={{ gridArea: 'qty' }}
            readOnly id="qty"
            disabled
            value={this.state.quantity}>
              <option value={this.state.quantity}>
                {this.state.quantity}
              </option>
          </CartDropdown>
        <div style={red}>{this.state.warning.replace(/ /g, "\u00a0")}</div>
        <AddToCartButton
          style={{ gridArea: 'cart' }}
          onClick={this.handleAddCart}>
            Add To Cart
        </AddToCartButton>

        <AddToCartButton
          id="sharebutton"
          onMouseEnter={this.handleShareHover}
          onMouseLeave={this.handleShareHover}
          onClick={this.handleShareOpen}
          style={{ gridArea: 'share', display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.shareHover ? <>
              <span
                className="fb-share-button"
                data-href={(new URL(document.location)).href}data-layout="button_count"
                data-size="small">
                <a
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer"
                  href={this.state.shareHover ? `https://www.facebook.com/sharer/sharer.php?u=${(new URL(document.location)).href};src=sdkpreparse`: ''}
                  className="sharelink fb-xfbml-parse-ignore  lni lni-facebook-filled">
                </a>
              </span>
              <a
                style={{ textDecoration: 'none' }}
                className="sharelink lni lni-twitter-original"
                href={this.state.shareHover ? `https://twitter.com/intent/tweet?text=${(new URL(document.location)).href}`: ''}></a>
              <a
                style={{ textDecoration: 'none' }}
                className="sharelink lni lni-pinterest"
                href={this.state.shareHover ? `https://www.pinterest.com`: ''}></a>
              </>: <i className="sharelink lni lni-telegram-original"></i>}
        </AddToCartButton>
        </div>
        </>
      );

    } else {

      return(
        <>
        <div id="addcart" style={grid}>
          <CartDropdown
            id="size"
            style={{ gridArea: 'size' }}
            value={this.state.currSize}
            onChange={(event) => this.handleSizeSelect(event)}>
              <option
                defaultValue
                value={this.state.currSize}>
                  {this.state.currSize}
              </option>
              {skus.map((sku, index) => {
                if (sku.quantity > 0) {
                  return (
                    <option
                      key={sku.sku}
                      value={index}>
                        {sku.size}
                    </option>
                  );
                }
              })}
          </CartDropdown>
          <CartDropdown
            id="qty"
            style={{ gridArea: 'qty' }}
            value={this.state.quantity}
            onChange={(event) => this.handleQtySelect(event)}>
              <option
                defaultValue
                value={this.state.quantity}>
                  {this.state.quantity}
              </option>
              {this.state.max.map((num) => {
                return (
                  <option
                      key={num}
                      value={`Qty: ${num}`}>
                        {num}
                    </option>
                )
              })}
          </CartDropdown>
        <div style={red}>{this.state.warning.replace(/ /g, "\u00a0")}</div>
        <AddToCartButton
          style={{ gridArea: 'cart' }}
          onClick={this.handleAddCart}>
            Add To Cart
        </AddToCartButton>

        <AddToCartButton
          id="sharebutton"
          onMouseEnter={this.handleShareHover}
          onMouseLeave={this.handleShareHover}
          onClick={this.handleShareOpen}
          style={{ gridArea: 'share', display: 'flex', justifyContent: 'space-evenly' }}>
            {this.state.shareHover ? <>
              <span
                className="fb-share-button"
                data-href={(new URL(document.location)).href}data-layout="button_count"
                data-size="small">
                <a
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noreferrer"
                  href={this.state.shareHover ? `https://www.facebook.com/sharer/sharer.php?u=${(new URL(document.location)).href};src=sdkpreparse`: ''}
                  className="sharelink fb-xfbml-parse-ignore  lni lni-facebook-filled">
                </a>
              </span>
              <a
                style={{ textDecoration: 'none' }}
                className="sharelink lni lni-twitter-original"
                href={this.state.shareHover ? `https://twitter.com/intent/tweet?text=${(new URL(document.location)).href}`: ''}></a>
              <a
                style={{ textDecoration: 'none' }}
                className="sharelink lni lni-pinterest"
                href={this.state.shareHover ? `https://www.pinterest.com`: ''}></a>
              </>: <i className="sharelink lni lni-telegram-original"></i>}
        </AddToCartButton>
        </div>
        </>
      );
    }
  }
}

export default AddToCart;