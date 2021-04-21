import React from 'react';

import CurrentProduct  from './Utils/CurrentProduct.js'
import Nav from './components/Nav';
import Overview from './components/Overview';
import QandA from './components/QandA';
import RelatedProducts from './components/RelatedProducts';
import RatingsReviews from './components/RatingsReviews';

import { ThemeProvider } from 'styled-components';
import { Body, dark, light } from './Styles';


class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      dark: false,
      outfits: [],
    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    this.setState({
      dark: !this.state.dark,
    });
  }

  render() {
    const theme = this.state.dark ? dark: light;

    return (
      <ThemeProvider theme={theme}>
        <CurrentProduct render={ store => (
          <>
            <Nav
              cart={store.state.cart}
              dark={this.state.dark}
              toggleTheme={this.toggleTheme}/>
            <Body />
            <div id="content">
              <Overview
                store={store}
              />
              <RelatedProducts
                store={store}
                outfits={this.state.outfits}
              />
              <QandA
                store={store}
              />
              <RatingsReviews
                store={store}
              />
            </div>
          </>
        )}/>

      </ThemeProvider>
    )
  }
}

export default App;