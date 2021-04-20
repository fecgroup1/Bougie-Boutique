import React from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';
import Reviews from './Reviews';
import { RatingsContainer, ReviewsContainer,  RatingsAndReviewsContainer} from '../../Styles'





class RatingsReviews extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
    <section>
      <h4 class= 'RatingsReview'>Ratings and Reviews</h4>
      <RatingsAndReviewsContainer>
        <RatingsContainer>
          <Ratings meta={this.props.store.state.meta} />
        </RatingsContainer>
        <ReviewsContainer>
          <Reviews reviews ={this.props.store.state.reviews}/>
        </ReviewsContainer>
      </RatingsAndReviewsContainer>
    </section>




    );
}
}






export default RatingsReviews;

// const Reviews = ({store}) => (

//   <div>
//
//     <Reviews ratings= {store.ratings}/>
//   </div>

// )
