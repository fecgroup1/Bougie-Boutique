import styled from 'styled-components'


export const RatingsAndReviewsContainer = styled.section`
  display:grid;
  grid-template-columns: 40% 60%;
  margin:auto;
  width:80%;
  .dropDown {
    font-size: 93%;
    border-radius: 1px;
    padding: 7px;
    margin:10px;
    font-family: 'Josefin Sans';
    color:${props => props.theme.blkGry};
    background: ${props => props.theme.invertWht};
    border: 3px solid;
    border-color: ${props => props.theme.bluGry};
  }

  .reviews{
    min-width: 450px;
    max-width: 800px;
  }
`;

export const RatingsContainer = styled.div`
  min-width: 400px;
  .ratingBar {
    padding-left:5px;
    padding-right:5px;
  }
  .ratingBar :hover{
    background: ${ props => props.theme.faintBluGry};
    border-radius: 4px;
    padding-left:8px;

  }
`;

export const SingleReview = styled.div`
  margin: 7%;
  margin-left: 0px;
`;

