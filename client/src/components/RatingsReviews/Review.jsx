import React from 'react';
import { SingleReview} from '../../Styles'
//import Stars from './Styles/Stars.js'

const Review = ({ review }) => (
  <SingleReview>
    <span>rating {review.rating}</span>
    <span style={{'float': 'right'}}>{review.reviewerName},   {new Date(review.date).toLocaleString('en-us', {month:'long', day: 'numeric', year: 'numeric'})}</span>
    <h3>{review.summary}</h3> <span>{review.helpfulness}</span>
    <p>{review.body}</p>
    {review.recommended ? <p>I recomend this product</p> : <div></div>}
    {review.responseToReview ? <p>{review.responseToReview}</p> : <div></div>}
    <span>Was this review helpful? <span>Yes({review.helpfulness})</span></span><span>Report</span>
  </SingleReview>



);

export default Review;