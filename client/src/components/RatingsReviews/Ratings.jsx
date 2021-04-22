import React from 'react';
import { StarsOuter, StarsInner} from '../../Styles/';
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
   if(!meta.averageRating){
     return (<div>This product has no reviews</div>)
   }
  return (<div>
    <h3 style={{'fontSize': '200%'}}>{meta.averageRating}</h3>
    <StarsOuter>
            <StarsInner rating={meta.starRating}/>
    </StarsOuter>

    <p>{calculatePercent(meta.recommended)}% of reviews recomend this product</p>
    <Characteristics characteristics={meta.characteristics} />
  </div>);
}



export default Ratings;



// //recommended": {
//   "false": "3",
//   "true": "20"
// },