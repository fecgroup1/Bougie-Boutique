import React from 'react';
import ReactDOM from 'react-dom';
// import { AppStore, ProductAPI, QuestionAPI, ReviewAPI } from './Utils'
import AppStore  from './Utils/AppStore.js'
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
    }
  }

  render() {

   {/*const store = this.props.store
   console.log('this is the store: ', store)*/}

    return (
      <div>
        <h1>Hola Mundo!!</h1>

        <AppStore render={ store => (
          <div>
            <Overview
              store={store}
            />
            <RelatedProducts
              store={store}
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

ReactDOM.render(<App />, document.getElementById('app'));

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