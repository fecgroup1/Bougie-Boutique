import React from 'react';
import ReactDom from 'react-dom';
import QandA from './Components/QandA/QandA.jsx';
import RelatedProducts from './Components/RelatedProducts';

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
        {/* <Nav/>
        <ProductDetail/>
        <RelatedProducts/>
        <QandA/>
        <ReViews/> */}
      </div>
    )
  }


};




ReactDom.render(<App/>, document.getElementById('app'));