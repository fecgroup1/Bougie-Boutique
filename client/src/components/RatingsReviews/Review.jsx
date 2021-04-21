import React from 'react';
//import Stars from './Styles/Stars.js'

const Review = ({ review }) => (
  <div>
    <p>rating {review.rating}</p>
    <span>{new Date(review.date).toLocaleString('en-us', {month:'long', day: 'numeric', year: 'numeric'})}</span>
    <h3>{review.summary}</h3>
    <p>{review.body}</p>
    {review.recommended ? <p>I recomend this product</p> : <div></div>}
    {review.responseToReview ? <p>{review.responseToReview}</p> : <div></div>}
    <span>Was this review helpful? <span>Yes({review.helpfulness})</span></span><span>Report</span>

  </div>
);

export default Review;