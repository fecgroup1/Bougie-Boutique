import React from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';





class Reviews extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (<div>
      <h5>Ratings and Reviews</h5>
      <Ratings meta={this.props.store.state.meta} />
    </div>);
}
}






export default Reviews;

// const Reviews = ({store}) => (

//   <div>
//
//     <Reviews ratings= {store.ratings}/>
//   </div>

// )
