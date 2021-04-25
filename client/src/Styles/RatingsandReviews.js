import styled from 'styled-components'


export const RatingsAndReviewsContainer = styled.section`
  display:grid;
  grid-template-columns: 35% 65%;
  margin:2%


`;

export const RatingsContainer = styled.div`

`;
export const ReviewButton = styled.div`
fontSize: 105%
borderRadius: 1px
padding: 15px
 margin: 10px
color: ${ props => props.theme.blkGry}
fontFamily: Josefin Sans
fontWeight: bold
background: ${props => props.theme.invertWht}
border: 3px solid
borderColor: ${props => props.theme.bluGry}
`;

export const SingleReview = styled.div`
  margin: 7%;
  margin-left: 0px;
`;


// -webkit-appearance: radio;
// appearance: radio;