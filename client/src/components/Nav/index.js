import React from 'react';
import { Title } from './../../Styles';

const Nav = ({dark, toggleTheme}) => {
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

  const right = {
    border: 'none',
    color: '#ccc',
    background: 'none',
    fontSize: '20px',
    outline: 'none',
    height: 'auto',
    padding: 0,
    position: 'absolute',
    top: '24px',
    right: '27px',
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
      <div style={label}>Theme</div>
        <button
          style={right}
          onClick={toggleTheme}>
            <span className={icon}></span>
        </button>
    </div>
  );
}

export default Nav;