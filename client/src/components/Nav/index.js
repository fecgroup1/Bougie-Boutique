import React from 'react';
import { Title, ThemeToggle } from './../../Styles';

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const dark = this.props.dark;
    const toggleTheme = this.props.toggleTheme;

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
      position: 'absolute',
      top: '24px',
      right: '20px',
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
          <ThemeToggle
            style={right}
            onClick={toggleTheme}>
              <span className={icon}></span>
          </ThemeToggle>
      </div>
    );
  }
}

export default Nav;