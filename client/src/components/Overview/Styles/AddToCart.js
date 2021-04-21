import React from 'react';
import { Select } from './../../../Styles';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSize: 'Select a size',
      quantity: 'Qty: --',
      max: 0,
      toAdd: 0,
      warning: '',
    };
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
    this.handleQtySelect = this.handleQtySelect.bind(this);
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
    console.log('Did not re-render');
    return false;
  }

  handleSizeSelect(event) {
    event.preventDefault();
    let skus = this.props.styles[this.props.currStyle].skus;
    let quantity = skus[event.target.value].quantity;
    let max = quantity > 15 ? 15: quantity;
    let array = [];
    let i = 1;
    while (array.length < max) {
      array.push(i);
      i++;
    }
    this.setState({
      currSize: `Size: ${skus[event.target.value].size}`,
      quantity: 'Qty: 1',
      max: array,
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

  render() {
    const skus = this.props.styles[this.props.currStyle].skus;
    const grid = {
      display: 'grid',
      gridTemplateColumns: '100',
      justifyContent: 'space-between',
      alignContent: 'space-between',
    }

    if (this.props.outOfStock) {
      return (
        <form id="addcart" style={grid}>
          <span style={red}>Out of Stock</span>
          <Select id="size">
            <option value='0' disabled selected>Size: --</option>
          </Select>
          <Select id="qty">
            <option value='0' disabled selected>Qty: --</option>
          </Select>
        </form>
      );
    } else if (this.state.currSize === 'Select a size') {

      return (
        <form id="addcart" style={grid}>
          <Select
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
          </Select>
          <Select id="qty" disabled>
            <option value={this.state.quantity}>{this.state.quantity}</option>
          </Select>
        </form>
      );

    } else {

      return(
        <form id="addcart" style={grid}>
          <Select
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
          </Select>
          <Select
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
          </Select>
        </form>
      );
    }
  }
}

export default AddToCart;