import React from 'react';
import { Flex, LinedTop, Left, Right } from './../../Styles';

const Details = ({slogan, description, features}) => {

  const impact = {
    fontFamily: 'Yeseva One, cursive',
    fontSize: '20px',
  }

  var loading = {
    paddingTop: '10px',
    opacity: `${description === null ? '50%': '100%'}`,
  };

  return (
    <div id="details" style={loading}>
      <span style={impact}>{slogan}</span>
      <Flex>
        <Left>
          <LinedTop>
            <b>Description</b><br/><br/>
            {description}
          </LinedTop>
        </Left>
        <Right>
          <LinedTop>
            <b>Features</b>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>{feature.feature}: {feature.value}</li>
              ))}
            </ul>
          </LinedTop>
        </Right>
      </Flex>
    </div>
  );
}

export default Details;