import React from 'react';
import { Flex, LinedTop, Left, Right } from './../../Styles';

const impact = {
  fontFamily: 'Yeseva One, cursive',
  fontSize: '20px',
}

const Details = ({slogan, description, features}) => (
    <div id="details" style={{paddingTop: '10px'}}>
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

export default Details;