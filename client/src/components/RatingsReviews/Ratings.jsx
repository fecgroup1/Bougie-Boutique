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
    <span style={{'fontSize': '300%'}}>{meta.averageRating}</span>
    <StarsOuter style={{fontSize: '95%', verticalAlign:'top', marginLeft: '10px'}}>
            <StarsInner rating={meta.starRating}/>
    </StarsOuter>
    <p>{calculatePercent(meta.recommended)}% of reviews recomend this product</p>
        {filteredFor['5']? <i>&#10003;</i> : <div></div>} <span className= 'ratingBar' onClick= {()=> filterReviews('5')}><span >5 stars </span><meter min= '0' max= '100' value= {meta.ratings['5']? (meta.ratings['5'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['5']? (meta.ratings['5']): 0})</span></span><br></br>
        {filteredFor['4']? <i>&#10003;</i> : <div></div>}<span class= 'ratingBar' onClick= {()=> filterReviews('4')}><span >4 stars </span><meter min= '0' max= '100' value= {meta.ratings['4']? (meta.ratings['4'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['4']? (meta.ratings['4']): 0})</span></span><br></br>
        {filteredFor['3']? <i>&#10003;</i> : <div></div>}<span class= 'ratingBar' onClick= {()=> filterReviews('3')}><span >3 stars </span><meter min= '0' max= '100' value= {meta.ratings['3']? (meta.ratings['3'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['3']? (meta.ratings['3']): 0})</span></span><br></br>
        {filteredFor['2']? <i>&#10003;</i> : <div></div>}<span class= 'ratingBar' onClick= {()=> filterReviews('2')}><span >2 stars </span><meter min= '0' max= '100' value= {meta.ratings['2']? (meta.ratings['2'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['2']? (meta.ratings['2']): 0})</span></span><br></br>
        {filteredFor['1']? <i>&#10003;</i> : <div></div>}<span class= 'ratingBar' onClick= {()=> filterReviews('1')}><span >1 stars </span><meter min= '0' max= '100' value= {meta.ratings['1']? (meta.ratings['1'] / totalReviews)* 100 : 0}></meter> <span style={{fontSize:'80%'}}>({meta.ratings['1']? (meta.ratings['1']): 0})</span><br></br></span><br></br>
    <Characteristics characteristics={meta.characteristics} />
  </div>);
}



export default Ratings;


