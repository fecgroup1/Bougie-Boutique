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
    let widget = -1;
    let data = {}

    while ( typeof widget === 'number') {
      widget++
      let temp = event.path[widget].attributes
      if(temp) {
        let code = temp.getNamedItem('tracking');
        if (code) {
          console.log('this is the temp', code)
          data = code.value ? {element: event.target, widget: code.value, time: timeStamp } : {};
          widget = code.value;
          console.log('new data', data)
        }
      }

      if (widget === event.path.length) {
        data.element = event.target
        data.widget = `no parent tracking code, path: ${event.path}`
        data.time = timeStamp
      }

    }

    console.log(data)
    console.log(event);
    console.log(event.path);
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
                <Overview
                  store={store}
                />
                <RelatedProducts
                  store={store}
                  outfits={this.state.outfits}
                  theme={theme}
                />
                <QandA
                  store={store}
                  tracking={'Questions and Answers'}
                />
                <RatingsReviews
                  store={store}
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