import React from 'react';

const Stars = ({rating, reviews}) => (
  <div>
    <div className="stars">
      Star Rating: {rating}
    </div>
    <div>
      <a href="">Read all {reviews} reviews</a>
    </div>
  </div>
)

export default Stars;