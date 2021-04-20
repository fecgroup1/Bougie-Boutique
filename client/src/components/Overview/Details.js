import React from 'react';

const impact = {
  fontFamily: 'Yeseva One, cursive',
  fontSize: '20px',
}

const Details = ({slogan, description, features}) => (
    <div id="details">
      <span style={impact}>{slogan}</span>
      <div className="flex">
        <div id="description" className="topline left">
          <b>Description</b><br/>
          {description}
        </div>
        <div id="features" className="topline right">
          <b>Features</b>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature.feature}: {feature.value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
);

export default Details;