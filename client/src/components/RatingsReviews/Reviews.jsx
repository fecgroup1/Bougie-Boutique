import React from 'react';
import Review from './Review';
import NewReviewModal from './NewReviewModal';





class Reviews extends React.Component {
  constructor(props){
    super(props);
    this.closeModal= this.closeModal.bind(this)
    this.state={
      length:2,
      renderbutton: true,
      modalIsOpen: false,
    }
  }

  closeModal(){
    this.setState({modalIsOpen:false})
  }


  showMore(){
    this.setState({length: this.state.length + 2});
    if (this.state.length>= this.props.reviewsToShow.length){
      this.setState({renderbutton: false})
    }
  }

  render(){
     if (! this.props.reviewsToShow) {
      return <div>loading...</div>
    }
    var reviews= this.props.reviewsToShow.slice(0,this.state.length)
    return (
    <div>
      <span>{reviews.length} reviews, sorted by </span><select onChange= {(event)=> this.props.sortReviews(event.target.selectedIndex)}> <option>Relevant</option><option>Helpful</option><option>Newest</option></select>
      {reviews.map((review)=> <Review review={review}/>)}
      {reviews.length >0 ? (this.state.renderbutton ? <button onClick={(event)=>{this.showMore()}}> More Reviews </button> : <div></div>): <div></div> }
      <button onClick= {(event)=> this.setState({modalIsOpen:true})}>Add A Review</button>
      <NewReviewModal
      close={this.closeModal}
      isOpen= {this.state.modalIsOpen}
      productName= {this.props.product.name}
      productId= {this.props.productId}
      characteristics= {this.props.meta.characteristics}/>
    </div>)
  }


}

export default Reviews;