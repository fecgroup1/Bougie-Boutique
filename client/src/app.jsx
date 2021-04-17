import React from 'react';
import ReactDom from 'react-dom';
// import { Store, ProductAPI, QuestionAPI, ReviewAPI } from './Utils'
import { Store } from './Utils'
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
    return (
      <div>
        <h1>Hola Mundo</h1>
        <Nav />
        <Overview
          store={<Store />}
        />
        <RelatedProducts
          store={<Store />}
        />
        <QandA
          store={<Store />}
        />
        <RatingsReviews
          store={<Store />}
        />
      </div>
    )
  }


}

ReactDom.render(<App/>, document.getElementById('app'));