import React from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';
import Reviews from './Reviews';
import { RatingsContainer } from '../../Styles'





class RatingsReviews extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      <h4>Ratings and Reviews</h4>
      <RatingsContainer>
        <Ratings meta={this.props.store.state.meta} />
      </RatingsContainer>
      <Reviews reviews ={this.props.store.state.reviews}/>
    </div>

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
