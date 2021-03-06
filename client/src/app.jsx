import React, { useState, useEffect } from 'react';

import CurrentProduct  from './Utils/CurrentProduct.js'
import Nav from './components/Nav';
import Overview from './components/Overview';
import QandA from './components/QandA';
import RelatedProducts from './components/RelatedProducts';
import RatingsReviews from './components/RatingsReviews';

import { ThemeProvider } from 'styled-components';
import { Body, dark, light } from './Styles';

import TrackingAPI from './Utils/TrackingAPI.js'

const App = ({match, location, history}) => {
  const [theme, setTheme] = useState(dark);

  // METHODS
  const toggleTheme = () => {
    if (theme === dark) {
      setTheme(light);
    } else {
      setTheme(dark);
    }
  }

  const handleTracking = (event) => {
    let timeStamp = new Date();
    let data = {}
    for (let i = 0; i < event.path.length; i++) {
      if(event.path[i]) {
        if (event.path[i].attributes) {
          let code = event.path[i].attributes.getNamedItem('tracking');
          if (code) {
            data = code.value ? {element: event.target.outerHTML, widget: code.value, time: timeStamp } : {};
            if (code.value) {
              i = event.path.length;
            }
            // console.log('tracking data', data)
          }
        }
      }
    }
    if (data.widget) {
      TrackingAPI.sendTrackingData(data)
      .then((response) => {
        // console.log(response)
      })
      .catch((err) => console.log(err))
    }
  }

  const getPID = () => {
    let pid = 13023;
    if (location.pathname.length >= 5) {
      let string = location.pathname.slice(1);
      pid = string;
    } else if (location.search.length >= 5) {
      let string = location.search;
      let index = string.indexOf('pid=');
      pid = string.slice(index + 4, index + 9);
    } else if (match.params.pid !== undefined) {
      pid = match.params.pid;
    }
    return pid;
  }

  // COMPONENTDIDMOUNT
  useEffect(() => {
    document.body.addEventListener('click', handleTracking);
  }, []);

  // RENDER
  return (
    <ThemeProvider theme={theme}>
      <CurrentProduct
        pid={getPID()}
        history={history}
        render={ store => (
          <>
            <Body />
            <Nav
              cart={store.state.cart}
              store={store}
              toggleTheme={toggleTheme}
              theme={theme}
            />
            <div id="content">
              <section tracking="Overview">
                <Overview
                  store={store}
                />
              </section>
              <section tracking="Related Products">
                <RelatedProducts
                  store={store}
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
  );
};

export default App;