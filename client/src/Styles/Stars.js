import styled from 'styled-components';

const OuterStars = styled.div`
  display: inline-block;
  position: relative;
  top: 0;
  left: 0;
  color: ${props => props.theme.bluGry} !important;
`

const func = (props) => (
  `
  width: ${props.rating / 5 * 100}%;
  `
)

const InnerStars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.theme.bluGry} !important;
  ${props => func(props)}
`

import React from 'react';

export const StarsDisplay = (props) => (
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