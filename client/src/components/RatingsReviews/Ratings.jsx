import React from 'react';
import StarRating from './StarRatings';
import Stars from '../OverView/Styles/Stars.js';
import Characteristics from './Characteristics';

var calculatePercent = (obj)=>{
  var pos =Number(obj.true);
  var neg = Number(obj.false);
  var total = pos + neg;
  var percent = (pos / total) * 100;
  percent= Math.round(percent);
  return percent;

}


const Ratings = ({ meta }) => {
  if (!meta) {
     return <div>loading...</div>
   }
  return (<div>
    <div>{meta.averageRating}</div>
    <Stars rating={meta.starRating} />
    <p>{calculatePercent(meta.recommended)}% of reviews recomend this product</p>
    <Characteristics characteristics={meta.characteristics} />
  </div>);
}



export default Ratings;



// //recommended": {
//   "false": "3",
//   "true": "20"
// },