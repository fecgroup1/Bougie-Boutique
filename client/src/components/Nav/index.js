import React from 'react';
import { Title, ThemeToggle } from './../../Styles';

const countItems = (obj) => {
  let count = 0;
  for (let item in obj) {
    count += obj[item];
  }
  return count;
}

const Nav = ({cart, dark, toggleTheme}) => {

  const cartCount = countItems(cart);

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
    right: '27px',
  }

  const cartIcon = {
    right: '70px',
  }
  const number = {
    position: 'absolute',
    fontFamily:"'Josefin Sans', sans-serif",
    fontSize: '12px',
    top: '0px',
    right: '75px',
    textAlign: 'center',
    width: '20px',
  }
  const label = {
    position: 'absolute',
    fontFamily:"'Josefin Sans', sans-serif",
    fontSize: '12px',
    top: '-2px',
    right: '20px',
    textShadow:
    `-1px -1px 0 #002a60,
      1px -1px 0 #002a60,
      -1px 1px 0 #002a60,
      1px 1px 0 #002a60`,
    zIndex: 1,
  }

  const icon = dark ? 'lni lni-night': 'lni lni-sun'

  return(
    <div id="top" style={header}>
      <Title style={title}>
        Bougie Boutique
      </Title>
      <div style={number}>{cartCount}</div>
      <ThemeToggle
          style={cartIcon}>
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