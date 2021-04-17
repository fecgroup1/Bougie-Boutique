import React from 'react';
import ReactDom from 'react-dom';
// import { Store, ProductAPI, QuestionAPI, ReviewAPI } from './Utils'
import Overview from './Components/Overview'
import QandA from './Components/QandA';
import RelatedProducts from './Components/RelatedProducts';
import RatingsReviews from './Components/RatingsReviews';

class App extends React.Component {

  constructor (props) {
    super(props);

    // this.state = {
    //   currentProduct:{
    //     styles:[{}],
    //     relatedIds:[],
    //     reviews: {
    //       averageRating: 0,
    //       reviews[{}]
    //     }
    //   },
    //   relatedProducts:[{Product:{}, averageRating: 0}],
    //   outfit:[{}]
    // }

  }

  render() {
    return (
      <div>
        <h1>Hola Mundo</h1>
        <Nav/>
        <Overview
          store={<Store />}
        />
        <RelatedProducts
          store={<Store />}
        />
        <QandA
          store={<Store />}
        />
        <Reviews
          store={<Store />}
        />
      </div>
    )
  }


};




ReactDom.render(<App/>, document.getElementById('app'));