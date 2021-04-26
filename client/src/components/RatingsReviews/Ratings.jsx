import React from 'react';
import { StarsOuter, StarsInner} from '../../Styles/';
import Characteristics from './Characteristics';

var calculatePercent = (obj)=>{
  var pos =Number(obj.true) || 0;
  var neg = Number(obj.false) || 0;
  var total = pos + neg;
  var percent = (pos / total) * 100;
  percent= Math.round(percent);
  return percent;

}
var calulateTotalReviews = (ratings) => {
  var total = 0
  for (var key in ratings){
    total += Number(ratings[key]);
  }
  return total;
}


const Ratings = ({ meta, filterReviews, filteredFor }) => {
  if (!meta) {
     return <div>loading...</div>
   }
   if(!meta.averageRating){
     return (<div>This product has no reviews</div>)
   }
   var totalReviews = calulateTotalReviews(meta.ratings)
  return (<div>
    <h3 style={{'fontSize': '250%'}}>{meta.averageRating}</h3>
    <StarsOuter style={{'fontSize': '130%'}}>
            <StarsInner rating={meta.starRating}/>
    </StarsOuter>
    <p>{calculatePercent(meta.recommended)}% of reviews recomend this product</p>
        {filteredFor['5']? <i>&#10003;</i> : <div></div>} <a onClick= {()=> filterReviews('5')}>5 stars </a><meter min= '0' max= '100' value= {meta.ratings['5']? (meta.ratings['5'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['5']? (meta.ratings['5']): 0})</span><br></br>
        {filteredFor['4']? <i>&#10003;</i> : <div></div>}<a onClick= {()=> filterReviews('4')}>4 stars </a><meter min= '0' max= '100' value= {meta.ratings['4']? (meta.ratings['4'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['4']? (meta.ratings['4']): 0})</span><br></br>
        {filteredFor['3']? <i>&#10003;</i> : <div></div>}<a onClick= {()=> filterReviews('3')}>3 stars </a><meter min= '0' max= '100' value= {meta.ratings['3']? (meta.ratings['3'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['3']? (meta.ratings['3']): 0})</span><br></br>
        {filteredFor['2']? <i>&#10003;</i> : <div></div>}<a onClick= {()=> filterReviews('2')}>2 stars </a><meter min= '0' max= '100' value= {meta.ratings['2']? (meta.ratings['2'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['2']? (meta.ratings['2']): 0})</span><br></br>
        {filteredFor['1']? <i>&#10003;</i> : <div></div>}<a onClick= {()=> filterReviews('1')}>1 stars </a><meter min= '0' max= '100' value= {meta.ratings['1']? (meta.ratings['1'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['1']? (meta.ratings['1']): 0})</span><br></br><br></br>
    <Characteristics characteristics={meta.characteristics} />
  </div>);
}



export default Ratings;


