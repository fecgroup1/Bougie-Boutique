import React from 'react';

const Reviews = ({reviews})=> {
  console.log('this is reviews', reviews)
  if (!reviews) {
    return <div>loading...</div>
  }
  return (
  <div>
    <span>{reviews.length} reviews, sorted by </span><select> <option>Relevant</option></select>
  </div>

  )
}

export default Reviews;