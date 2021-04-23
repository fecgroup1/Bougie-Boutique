import React from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';
import Reviews from './Reviews';
import { RatingsContainer, ReviewsContainer,  RatingsAndReviewsContainer} from '../../Styles'





class RatingsReviews extends React.Component {
  constructor(props){
    super(props);
    this.sortReviews= this.sortReviews.bind(this);
    this.filterReviews= this.filterReviews.bind(this);
    this.state={
      reviewsToShow: this.props.store.state.reviews,
      sortedBy:0,
      filteredFor:{
        count:0,
        1:false,
        2:false,
        3:false,
        4:false,
        5:false
      }
    }
  }

  filterReviews(numberOfStars){
    var changeTo;
    var filteredFor = {...this.state.filteredFor};

    this.state.filteredFor[numberOfStars]? changeTo=false : changeTo=true;
    changeTo? filteredFor.count= filteredFor.count+1 : filteredFor.count= filteredFor.count-1;
    filteredFor[numberOfStars]=changeTo;
    filteredFor.count !== 0 ?  filteredFor= filteredFor : filteredFor= {
        count:0,
        1:false,
        2:false,
        3:false,
        4:false,
        5:false,
      }
    this.setState({filteredFor:filteredFor})
    if(filteredFor.count === 0){
      this.sortReviews(this.state.sortedBy,  this.props.store.state.reviews)
    }else {
      var reviewsToShow= []
    for (var i=0; i<this.props.store.state.reviews.length; i++){
      if (filteredFor[this.props.store.state.reviews[i].rating]){
        reviewsToShow.push(this.props.store.state.reviews[i]);
      }
    }
    this.sortReviews(this.state.sortedBy, reviewsToShow)
    }
  }

  sortReviews(index, inputArray){
    var array = inputArray || [...this.state.reviewsToShow];
    if(index===0){
      var storage={};
      array.sort((a,b)=> (a.date<b.date) ? 1: -1)
      for (var i=0; i<array.length; i++){
        storage[array[i].reviewerName]= i;
      }
      array= [...array]

      for (var i=0; i<array.length; i++){
        storage[array[i].reviewerName]= storage[array[i].reviewerName]- (array[i].helpfulness/4)
      }
      array.sort((a,b)=> (storage[a.reviewerName]> storage[b.reviewerName]) ? 1: -1)
      this.setState({sortedBy:0, reviewsToShow: array})
    }else if (index === 2){
      array.sort((a,b)=> (a.date<b.date) ? 1: -1)
      this.setState({sortedBy:2, reviewsToShow: array})
    }else if(index ===1){
      array.sort((a,b)=> (a.helpfulness<b.helpfulness) ? 1: -1)
      this.setState({sortedBy:1, reviewsToShow: array})
    }

  }

  render(){
    return (
    <section>
      <h2 style={{'marginBottom': '50px','marginTop': '100px'}}>Ratings and Reviews</h2>
      <RatingsAndReviewsContainer>
        <RatingsContainer>
          <Ratings
          meta={this.props.store.state.meta}
          filterReviews= {this.filterReviews}
          filteredFor= {this.state.filteredFor}/>
        </RatingsContainer>
        <ReviewsContainer>
          <Reviews key={this.state.reviewsToShow}
          reviewsToShow ={this.state.reviewsToShow}
          product = {this.props.store.state.product}
          productId = {this.props.store.state.currentProductId}
          meta= {this.props.store.state.meta}
          sortReviews= {this.sortReviews}
          />
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
