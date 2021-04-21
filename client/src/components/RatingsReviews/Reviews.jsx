import React from 'react';
import Review from './Review';




class Reviews extends React.Component {
  constructor(props){
    super(props);
    this.state={
      reviewsToShow: this.props.reviews,
      length:2,
      renderbutton: true,
    }
  }

  sortReviews(index){
    console.log(index)
    var array = [...this.state.reviewsToShow];

    if (index === 2){
      array.sort((a,b)=> (a.date>b.date) ? 1: -1)
      this.setState({reviewsToShow: array})
    }
    console.log(array)
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
    var reviews= this.state.reviewsToShow.slice(0,this.state.length)
    return (
    <div>
      <span>{reviews.length} reviews, sorted by </span><select onChange= {(event)=> this.sortReviews(event.target.selectedIndex)}> <option>Relevant</option><option>Helpful</option><option>Newest</option></select>
      {reviews.map((review)=> <Review review={review}/>)}
      {this.state.renderbutton ? <button onClick={(event)=>{this.showMore()}}> More Reviews </button> : <div></div> }

    </div>)
  }


}

export default Reviews;