import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSize: 'Select a size',
      quantity: 'Qty: --',
      max: 0,
      totalStock: 0,
      toAdd: 0,
      warning: '',
    };
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQtySelect = this.handleQtySelect.bind(this);
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.styles[this.props.currStyle].style_id !== nextProps.styles[nextProps.currStyle].style_id) {
      return true;
    }
    if (this.state.currSize !== nextState.currSize) {
      return true;
    }
    if (this.state.quantity !== nextState.quantity) {
      return true;
    }
    if (this.state.warning !== nextState.warning) {
      return true;
    }
    console.log('Did not re-render');
    return false;
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
      warning: '',
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
      })
    } else if (this.state.quantity === 'Qty: 0') {
      this.setState({
        warning: 'All available stock in cart',
      });
    }else {
      var cartQty = Number(window.localStorage.getItem(this.state.toAdd));
      var addQty = Number(this.state.quantity.slice(5));
      if ( (cartQty + addQty) >= this.state.totalStock) {
        window.localStorage.setItem(this.state.toAdd, this.state.totalStock);
      } else if (cartQty > 0) {
        window.localStorage.setItem(this.state.toAdd, cartQty + addQty);
      }  else {
        window.localStorage.setItem(this.state.toAdd, addQty);
      }
      var size = this.state.currSize.slice(6);
      var style = this.props.styles[this.props.currStyle].name
      var title = this.props.title
      this.setState({
        currSize: 'Select a size',
        quantity: 'Qty: --',
        max: 0,
        toAdd: 0,
        warning: `${window.localStorage.getItem(this.state.toAdd)}x ${size} ${title} (${style}) in cart!`,
      });
    }
  }

  render() {
    const skus = this.props.styles[this.props.currStyle].skus;
    const grid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 48%)',
      columnGap: '1fr',
      justifyContent: 'space-between',
      alignContent: 'space-between',
    }
    const red = {
      height: '0.6em',
      color: 'red',
      fontSize: '0.6em',
      padding: '10px 5px',
    }

    if (this.props.outOfStock) {
      return (
        <>
        <form id="addcart" style={grid}>
          <select id="size">
            <option value='0' disabled selected>Size: --</option>
          </select>
          <select id="qty">
            <option value='0' disabled selected>Qty: --</option>
          </select>
        </form>
        <div style={red}>{this.state.warning}</div><br/><br/>
        <button onClick={this.handleAddCart}>Add To Cart</button>
        </>
      );
    } else if (this.state.currSize === 'Select a size') {

      return (
        <>
        <form id="addcart" style={grid}>
          <select
            id="size"
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
          </select>
          <select id="qty" disabled>
            <option value={this.state.quantity}>
              {this.state.quantity}
            </option>
          </select>
        </form>
        <div style={red}>{this.state.warning}</div>
        <button onClick={this.handleAddCart}>Add To Cart</button>
        </>
      );

    } else {

      return(
        <>
        <form id="addcart" style={grid}>
          <select
            id="size"
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
          </select>
          <select
            id="qty"
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
          </select>
        </form>
        <div style={red}>{this.state.warning}</div>
        <button onClick={this.handleAddCart}>Add To Cart</button>
        </>
      );
    }
  }
}

export default AddToCart;