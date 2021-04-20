import React from 'react';

const Stars = ({rating, reviews}) => {
  const inner = {
    width: `${rating / 5 * 100}%`,
  };

  const small = {
    fontSize: '14px',
  }

  return (
    <div>
      <div className="stars">
        <div className="outer">
          <div style={inner} className="inner"></div>
        </div>
        &nbsp;<a style={small} href="">Read all {reviews} reviews</a>
      </div>
    </div>
  )
};

export default Stars;