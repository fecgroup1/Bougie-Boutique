import React from 'react';
import { OuterStars, InnerStars } from './Stars';

const StarsDisplay = (props) => (
  <OuterStars style={props.styling}>
    <i className="lni lni-star"></i>
    <i className="lni lni-star"></i>
    <i className="lni lni-star"></i>
    <i className="lni lni-star"></i>
    <i className="lni lni-star"></i>
    <InnerStars rating={props.rating}>
      <i className="lni lni-star-filled"></i>
      <i className="lni lni-star-filled"></i>
      <i className="lni lni-star-filled"></i>
      <i className="lni lni-star-filled"></i>
      <i className="lni lni-star-filled"></i>
    </InnerStars>
  </OuterStars>
);

export default StarsDisplay;