import React from 'react';


const Details = ({slogan, description, features}) => (
    <div id="Details">
      Slogan: {slogan}<br></br>
      Description: {description}<br></br>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature.feature}: {feature.value}</li>
        ))}
      </ul>
    </div>
);

export default Details;