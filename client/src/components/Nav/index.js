import React from 'react';
import { Title, NavButton } from './../../Styles';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: this.props.theme.invertWht ? -0.95: 0
    }
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseOver() {
    this.setState({
      translate: this.props.theme.invertWht ? 0: -0.95
    });
  }

  handleMouseLeave() {
    this.setState({
      translate: this.props.theme.invertWht ? -0.95: -0
    });
  }

  render() {

    const cart = this.props.cart;
    const dark = this.props.theme.invertWht;
    const toggleTheme = this.props.toggleTheme;

    const countItems = (obj) => {
      let count = 0;
      for (let item in obj) {
        count += obj[item];
      }
      return count;
    }

    const cartCount = countItems(cart);

    const header = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      background: '#002a60',
      color: '#cccccc',
      height: '80px',
      marginBottom: '20px',
    }

    const title = {
      position: 'relative',
      paddingLeft: '20px'
    }

    const right = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }

    const track = {
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'center',
      background: `#${dark ? '001a3c':'003E8D'}`,
      height: '1.5em',
      width: '3em',
      borderRadius: '25%/50%',
      fontSize: '1.25em',
      padding: '0.25em',
      textAlign: 'justify',
      marginLeft: '10px',
      transition: 'background 0.5s',
    }

    const toggle = {
      position: 'relative',
      right: '30px',
      transform: `translateX(${this.state.translate}em)`,
      transition: 'transform 0.5s',
      background: '#ccc',
      width: '0.75em',
      height: '0.75em',
      borderRadius: '50%',
    }

    const cartIcon = {
      right: '70px',
    }
    const number = {
      position: 'relative',
      top: '0.25em',
      left: '2em',
      fontFamily:"'Josefin Sans', sans-serif",
      fontSize: '0.75em',
      textAlign: 'center',
      width: '20px',
    }
    return(
      <div id="top" style={header}>
        <Title style={title}>
          Bougie Boutique
        </Title>
        <div className="headerRight" style={right}>
          <div style={number}>{cartCount}</div>
          <NavButton
              style={cartIcon}>
              <span className="lni lni-tshirt"></span>
          </NavButton>
          <NavButton
            style={track}
            onClick={toggleTheme}
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}>
              <span className="lni lni-sun"></span>
              <span> </span>
              <span className="lni lni-night"></span>
          </NavButton>
          <NavButton
            style={toggle}
            onClick={toggleTheme}
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}>
          </NavButton>
        </div>
      </div>
    );
  }
}

export default Nav;