import React from 'react';
import ReactDOM from 'react-dom';
// import { AppStore, ProductAPI, QuestionAPI, ReviewAPI } from './Utils'
import CurrentProduct  from './Utils/CurrentProduct.js'
import Nav from './components/Nav';
import Overview from './components/Overview';
import QandA from './components/QandA';
import RelatedProducts from './components/RelatedProducts';
import RatingsReviews from './components/RatingsReviews';

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      theme: 'dark',
      outfits: []
    }
  }

  render() {

   {/*const store = this.props.store
   console.log('this is the store: ', store)*/}

    return (
      <div>
        <h1>Hola Mundo!!</h1>

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
    )
  }


}

// ReactDom.render(
//   <AppStore
//     render={
//       store => (
//         <App store={store}/>
//       )
//     }
//   />
// , document.getElementById('app'));
export default App;