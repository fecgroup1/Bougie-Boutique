import React from 'react';

import CurrentProduct  from './Utils/CurrentProduct.js'
// import Nav from './components/Nav';
import Overview from './components/Overview';
import QandA from './components/QandA';
import RelatedProducts from './components/RelatedProducts';
import RatingsReviews from './components/RatingsReviews';

import { ThemeProvider } from 'styled-components';
import { Body, Title, dark, light } from './Styles';

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      theme: 'dark',
      outfits: [],
    }
  }

  render() {
    const theme = this.state.theme === 'dark' ? dark: light;

    return (
      <ThemeProvider theme={theme}>
        <Body />
          <div>
            <Title>Hola Mundo!!</Title>

            <CurrentProduct render={ store => (
              <div>
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
            )}/>
          </div>
      </ThemeProvider>
    )
  }
}

export default App;