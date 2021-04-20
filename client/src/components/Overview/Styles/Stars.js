import React from 'react';

const Stars = ({rating, reviews}) => {
  const inner = {
    width: `${rating / 5 * 100}%`,
  };

  return (
    <div>
      <div className="stars">
        <div className="outer">
          <div style={inner} className="inner"></div>
        </div>
      </div>
      <div>
        <a href="">Read all {reviews} reviews</a>
      </div>
    </div>
  )
};

export default Stars;