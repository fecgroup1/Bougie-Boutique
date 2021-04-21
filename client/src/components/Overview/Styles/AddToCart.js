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
    };
    this.handleSizeSelect = this.handleSizeSelect.bind(this);
  }

  handleSizeSelect(event) {
    event.preventDefault();
    let max = quantity > 15 ? 15: quantity;
    let skus = this.props.styles[this.props.currStyle].skus;
    let quantity = skus[event.target.value].quantity;
    this.setState({
      currSize: `Size: ${skus[event.target.value].size}`,
      quantity: 'Qty: 1',
      max: max,
      toAdd: skus[event.target.value].sku,
    });
  }

  createQtySelect() {

  }

  render() {
    if (this.props.outOfStock) {
      return (
        <form id="addcart">
          <span style={red}>Out of Stock</span>
          <Select id="size">
            <option value='0' disabled selected>Size: --</option>
          </Select>
          <Select id="qty">
            <option value='0' disabled selected>Qty: --</option>
          </Select>
        </form>
      );
    } else if (this.state.currSize = 'Select a size') {

      const currStyle = this.props.currStyle;
      const skus = this.props.styles[currStyle].skus;

      return (
        <form id="addcart">
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
    }
  }
}

export default AddToCart;