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
    this.setState({length: this.state.length + 2}, ()=> {
      if (this.state.length>= this.props.reviewsToShow.length){
      this.setState({renderbutton: false})
    }
    });

  }


  render(){
     if (!this.props.meta) {
      return <div>loading...</div>
    }
    var reviews= this.props.reviewsToShow.slice(0,this.state.length)
    return (
    <div className= 'reviews'>
      <span>{this.props.reviewsToShow.length} reviews, sorted by </span><select className= 'dropDown' onChange= {(event)=> this.props.sortReviews(event.target.selectedIndex)}> <option>Relevant</option><option>Helpful</option><option>Newest</option></select> <br></br>
      <section data-testid='reviewsSection' style= {{maxHeight: '780px', overflowY:'auto'}}>
        {reviews.map((review)=> <Review review={review}/>)}
      </section>

      {this.props.reviewsToShow.length >2 ? (this.state.renderbutton ?
      <button data-testid='showMore'
      style= {{ fontSize: '105%', borderRadius: '1px',padding: '15px' , margin:'10px', fontFamily: 'Josefin Sans',
      fontWeight: 'bold',color:`${this.props.theme.blkGry}`, background: `${this.props.theme.invertWht}`, border: '3px solid', borderColor: `${this.props.theme.bluGry}`}}
      onClick={(event)=>{this.showMore()}}>More Reviews</button>
       : <div></div>): <div></div> }
      <button
      style= {{ fontSize: '105%', borderRadius: '1px',padding: '15px' , margin:'10px', fontFamily: 'Josefin Sans',
      fontWeight: 'bold',color:`${this.props.theme.blkGry}`, background: `${this.props.theme.invertWht}`, border: '3px solid', borderColor: `${this.props.theme.bluGry}`}}
      onClick= {(event)=> this.setState({modalIsOpen:true})}>Add A Review
      </button>
      <NewReviewModal
      close={this.closeModal}
      isOpen= {this.state.modalIsOpen}
      productName= {this.props.product? this.props.product.name : 'the product' }
      productId= {this.props.productId}
      characteristics= {this.props.meta.characteristics}
      setMeta= {this.props.setMeta}
      setReviews={this.props.setReviews}/>
    </div>)
  }


}

export default Reviews;