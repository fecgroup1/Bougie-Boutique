import React from 'react';
import { SingleReview} from '../../Styles'
import { StarsOuter, StarsInner} from '../../Styles/'
import Stars from '../Overview/Styles/Stars.js'
import axios from 'axios';

const Reportreview = (reviewId)=>{
  axios.put(`/reviews/${reviewId}/report`)
}


const Review = ({ review }) => (
  <SingleReview>
    <StarsOuter>
      <StarsInner rating={review.rating}/>
    </StarsOuter>
    <span style={{float: 'right'}}>{review.reviewerName},   {new Date(review.date).toLocaleString('en-us', {month:'long', day: 'numeric', year: 'numeric'})}</span>
    <h3>{review.summary}</h3>
    <p>{review.body}</p>
    {review.recommended ? <p style={{fontSize:'90%'}}> &#10003; I recomend this product</p> : <div></div>}
    {review.responseToReview ? <p>{review.responseToReview}</p> : <div></div>}
    <div style={{fontSize:'90%'}}>
      <span>Was this review helpful? </span>
      <a style={{margin:'10px'}}>Yes({review.helpfulness})</a>
      <span style={{marginLeft:'10px', marginRight:'15px'}}>|</span>
      <a onClick={()=>Reportreview(review.review_id)}>Report<i class="lni lni-flag-alt"></i> </a>
    </div>
  </SingleReview>



);

export default Review;