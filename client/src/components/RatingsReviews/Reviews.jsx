import React from 'react';
import Review from './Review';

const Reviews = ({reviews})=> {
  console.log('this is reviews', reviews)
  if (!reviews) {
    return <div>loading...</div>
  }
  return (
  <div>
    <span>{reviews.length} reviews, sorted by </span><select> <option>Relevant</option><option>Helpful</option><option>Newest</option></select>
    {reviews.map((review)=> <Review review={review}/>)}
  </div>

  )
}

export default Reviews;