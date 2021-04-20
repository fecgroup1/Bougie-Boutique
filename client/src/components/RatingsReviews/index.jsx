import React from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';
import Reviews from './Reviews';





class RatingsReviews extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      <h5>Ratings and Reviews</h5>
      <Ratings meta={this.props.store.state.meta} />
      <Reviews reviews ={this.props.store.state.reviews}/>
    </div>);
}
}






export default RatingsReviews;

// const Reviews = ({store}) => (

//   <div>
//
//     <Reviews ratings= {store.ratings}/>
//   </div>

// )
