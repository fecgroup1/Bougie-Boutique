import React from 'react';
import Review from './Review';




class Reviews extends React.Component {
  constructor(props){
    super(props);
    this.state={
      length:2,
      renderbutton: true
    }
  }

  showMore(){
    this.setState({length: this.state.length + 2});
    if (this.state.length>= this.props.reviews.length){
      this.setState({renderbutton: false})
    }

  }

  render(){
     if (! this.props.reviews) {
      return <div>loading...</div>
    }
    var reviews= this.props.reviews.slice(0,this.state.length)
    return (
    <div>
      <span>{reviews.length} reviews, sorted by </span><select> <option>Relevant</option><option>Helpful</option><option>Newest</option></select>
      {reviews.map((review)=> <Review review={review}/>)}
      {this.state.renderbutton ? <button onClick={(event)=>{this.showMore()}}> More Reviews </button> : <div></div> }

    </div>)
  }


}

export default Reviews;