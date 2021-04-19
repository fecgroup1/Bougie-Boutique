import React from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';

const Reviews = ({store}) => (
  <div>
    <Ratings meta={store.meta} />
  </div>
);

export default Reviews;

// const Reviews = ({store}) => (

//   <div>
//
//     <Reviews ratings= {store.ratings}/>
//   </div>

// )
