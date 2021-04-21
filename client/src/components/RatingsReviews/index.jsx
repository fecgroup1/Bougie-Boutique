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
      <h2 style={{'marginBottom': '50px','marginTop': '100px'}}>Ratings and Reviews</h2>
      <RatingsAndReviewsContainer>
        <RatingsContainer>
          <Ratings meta={this.props.store.state.meta} />
        </RatingsContainer>
        <ReviewsContainer>
          <Reviews key= {this.props.store.state.reviews} reviews ={this.props.store.state.reviews} product = {this.props.store.state.product}/>
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
