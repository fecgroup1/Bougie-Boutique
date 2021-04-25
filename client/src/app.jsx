import React from 'react';

import CurrentProduct  from './Utils/CurrentProduct.js'
import Nav from './components/Nav';
import Overview from './components/Overview';
import QandA from './components/QandA';
import RelatedProducts from './components/RelatedProducts';
import RatingsReviews from './components/RatingsReviews';

import { ThemeProvider } from 'styled-components';
import { Body, dark, light } from './Styles';

import TrackingAPI from './Utils/TrackingAPI.js'


class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      dark: false,
      outfits: [],
    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleTracking)
  }

  toggleTheme() {
    this.setState({
      dark: !this.state.dark,
    });
  }


  handleTracking(event) {
    let timeStamp = new Date();
    let data = {}
    for (let i = 0; i < event.path.length; i++) {
      if(event.path[i]) {
        if (event.path[i].attributes) {
          let code = event.path[i].attributes.getNamedItem('tracking');
          if (code) {
            data = code.value ? {element: event.target.outerHTML, widget: code.value, time: timeStamp } : {};
            i = event.path.length;
            console.log('tracking data', data)
          }
        }
      }
    }
    if (data.widget) {
      TrackingAPI.sendTrackingData(data)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
    }

  }

  render() {
    const theme = this.state.dark ? dark: light;
    return (
      <ThemeProvider theme={theme}>
        <CurrentProduct
          render={ store => (
            <>
              <Nav
                cart={store.state.cart}
                store={store}
                checkCart={store.checkCart}
                dark={this.state.dark}
                toggleTheme={this.toggleTheme}
              />
              <Body />
              <div id="content">
                <section tracking="Overview">
                  <Overview
                    store={store}
                  />
                </section>
                <section tracking="Related Products">
                  <RelatedProducts
                    store={store}
                    outfits={this.state.outfits}
                    theme={theme}
                  />
                </section>
                <section tracking='Questions and Answers'>
                  <QandA
                    store={store}
                  />
                </section>
                <RatingsReviews
                  store={store}
                  theme={theme}
                  key= {store.state.reviews}
                  tracking={'Ratings and Reviews'}
                />
              </div>
            </>
        )}/>
      </ThemeProvider>
    )
  }
}

export default App;