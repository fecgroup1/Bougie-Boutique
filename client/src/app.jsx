import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CurrentProduct  from './Utils/CurrentProduct.js'
import Nav from './components/Nav';
import Overview from './components/Overview';
import QandA from './components/QandA';
import RelatedProducts from './components/RelatedProducts';
import RatingsReviews from './components/RatingsReviews';

import { ThemeProvider } from 'styled-components';
import { Body, dark, light } from './Styles';

import TrackingAPI from './Utils/TrackingAPI.js'

const App = ({match, location}) => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? dark: light;

  // METHODS
  const toggleTheme = () => {
    setDarkMode(!dark);
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
    if (match.params.pid !== undefined) {
      pid = match.params.pid;
      console.log('match: ', pid);
    } else if (location.search.length >= 5) {
      let string = location.search;
      let index = string.indexOf('pid=');
      pid = string.slice(index + 4, index + 9);
      console.log('search: ', pid);
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
        render={ store => (
          <>
            <Body />
            <Nav
              cart={store.state.cart}
              store={store}
              checkCart={store.checkCart}
              dark={darkMode}
              toggleTheme={toggleTheme}
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



// class App extends React.Component {

//   constructor (props) {
//     super(props);

//     this.state = {
//       dark: false,
//       outfits: [],
//     }
//     this.toggleTheme = this.toggleTheme.bind(this)
//   }

//   componentDidMount() {
//     document.body.addEventListener('click', this.handleTracking)
//   }

//   toggleTheme() {
//     this.setState({
//       dark: !this.state.dark,
//     });
//   }


//   handleTracking(event) {
//     let timeStamp = new Date();
//     let data = {}
//     for (let i = 0; i < event.path.length; i++) {
//       if(event.path[i]) {
//         if (event.path[i].attributes) {
//           let code = event.path[i].attributes.getNamedItem('tracking');
//           if (code) {
//             data = code.value ? {element: event.target.outerHTML, widget: code.value, time: timeStamp } : {};
//             if (code.value) {
//               i = event.path.length;
//             }
//             // console.log('tracking data', data)
//           }
//         }
//       }
//     }
//     if (data.widget) {
//       TrackingAPI.sendTrackingData(data)
//       .then((response) => {
//         // console.log(response)
//       })
//       .catch((err) => console.log(err))
//     }

//   }

//   render() {
//     const theme = this.state.dark ? dark: light;
//     console.log(this.props.match.params.pid);
//     return (
//       <ThemeProvider theme={theme}>
//         <CurrentProduct
//           pid={13024}
//           render={ store => (
//             <>
//               <Body />
//               <Nav
//                 cart={store.state.cart}
//                 store={store}
//                 checkCart={store.checkCart}
//                 dark={this.state.dark}
//                 toggleTheme={this.toggleTheme}
//               />
//               <div id="content">
//                 <section tracking="Overview">
//                   <Overview
//                     store={store}
//                   />
//                 </section>
//                 <section tracking="Related Products">
//                   <RelatedProducts
//                     store={store}
//                     outfits={this.state.outfits}
//                     theme={theme}
//                   />
//                 </section>
//                 <section tracking='Questions and Answers'>
//                   <QandA
//                     store={store}
//                   />
//                 </section>
//                 <RatingsReviews
//                   store={store}
//                   theme={theme}
//                   key= {store.state.reviews}
//                   tracking={'Ratings and Reviews'}
//                 />
//               </div>
//             </>
//         )}/>
//       </ThemeProvider>
//     )
//   }
// }

export default App;