import React from 'react';
//import Stars from './Styles/Stars.js'

const Review = ({ review }) => (
  <div>
    <p>rating {review.rating}</p>
    <span>{review.date}</span>
    <h5>{review.summary}</h5>
    <p>{review.body}</p>
    {review.recommended ? <p>I recomend this product</p> : <div></div>}
    {review.responseToReview ? <p>{review.responseToReview}</p> : <div></div>}
    <span>Was this review helpful? <span>Yes({review.helpfulness})</span></span><span>Report</span>

  </div>
);

export default Review;