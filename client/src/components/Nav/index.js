import React from 'react';
import { Title, NavButton } from './../../Styles';

const countItems = (obj) => {
  let count = 0;
  for (let item in obj) {
    count += obj[item];
  }
  return count;
}

const Nav = ({cart, store, checkCart, dark, toggleTheme}) => {

  checkCart(store);

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
    transform: `translateX(${dark ? -0.95: 0}em)`,
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
  // const label = {
  //   position: 'absolute',
  //   fontFamily:"'Josefin Sans', sans-serif",
  //   fontSize: '12px',
  //   right: '20px',
  //   textShadow:
  //   `-1px -1px 0 #002a60,
  //     1px -1px 0 #002a60,
  //     -1px 1px 0 #002a60,
  //     1px 1px 0 #002a60`,
  //   zIndex: 1,
  // }

  const icon = dark ? 'lni lni-night': 'lni lni-sun'

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
          onClick={toggleTheme}>
            <span className="lni lni-sun"></span>
            <span> </span>
            <span className="lni lni-night"></span>
        </NavButton>
        <NavButton
          style={toggle}
          onClick={toggleTheme}>
        </NavButton>
      </div>
    </div>
  );
}


{/* <div
onClick={toggleTheme}
style={label}>
  Theme
</div> */}
export default Nav;