import React from 'react';
import { Title, ThemeToggle } from './../../Styles';

const Nav = ({dark, toggleTheme, cartQty}) => {
  const header = {
    width: '100%',
    background: '#002a60',
    color: '#cccccc',
    height: '80',
    lineHeight: '80px',
    marginBottom: '20px',
  }

  const title = {
    position: 'relative',
    paddingLeft: '20px'
  }

  const toggle = {
    position: 'absolute',
    top: '24px',
    right: '27px',
  }

  const cart = {
    position: 'absolute',
    top: '24px',
    right: '47px',
  }
  const number = {
    position: 'absolute',
    fontFamily:"'Josefin Sans', sans-serif",
    fontSize: '12px',
    top: '17px',
    right: '40px',
  }
  const label = {
    position: 'absolute',
    fontFamily:"'Josefin Sans', sans-serif",
    fontSize: '12px',
    top: '17px',
    right: '20px',
  }

  const icon = dark ? 'lni lni-night': 'lni lni-sun'

  return(
    <div id="top" style={header}>
      <Title style={title}>
        Bougie Boutique
      </Title>
      <div style={number}>{cartQty}</div>
      <ThemeToggle
          style={cart}>
          <span className="lni lni-tshirt"></span>
      </ThemeToggle>
      <div style={label}>Theme</div>
        <ThemeToggle
          style={toggle}
          onClick={toggleTheme}>
            <span className={icon}></span>
        </ThemeToggle>
    </div>
  );
}

export default Nav;