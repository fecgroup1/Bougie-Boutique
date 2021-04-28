import React, {useState} from 'react';
// import WidgetContainer from '../../Styles'
import Ratings from './Ratings';
import Reviews from './Reviews';
import { RatingsContainer,  RatingsAndReviewsContainer} from '../../Styles'





class RatingsReviews extends React.Component {
  constructor(props){
    super(props);
    this.sortReviews= this.sortReviews.bind(this);
    this.filterReviews= this.filterReviews.bind(this);
    this.searchReviews= this.searchReviews.bind(this);
    this.state={
      currentProductId: null,
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

  componentDidMount(){
    console.log('>------------------------ call to get reviews')
    this.props.store.setMeta(this.props.store.state.currentProductId)
    this.props.store.setReviews(this.props.store.state.currentProductId)
    this.setState({currentProductId: this.props.store.state.currentProductId})
  }

 componentDidUpdate(prevProps){
    if (Number(this.props.store.state.currentProductId) !== Number(this.state.currentProductId)){
      console.log('>------------------------ call to update reviews')
      this.setState({currentProductId: this.props.store.state.currentProductId})
      this.props.store.setMeta(this.props.store.state.currentProductId)
      this.props.store.setReviews(this.props.store.state.currentProductId)
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

  searchReviews(term){
    if(term.length > 2){
      var searchedReviews=[];
      for (var i=0; i< this.state.reviewsToShow.length; i++){
        var currentReview = this.state.reviewsToShow[i]
        if (currentReview.body.indexOf(term) !== -1 || currentReview.summary.indexOf(term) !== -1 ){
          searchedReviews.push(currentReview);
        }
      }
      this.setState({reviewsToShow: searchedReviews})
    }else{
      this.setState({reviewsToShow: this.props.store.state.reviews})
    }
  }

  render(){
    if (this.state.reviewsToShow === undefined){
      return<div></div>
    }
    return (
      <section data-testid='content' tracking={'Ratings and Reviews'}>
      <h2 id="ratingsreviews" style={{marginBottom: '50px',marginTop: '100px', marginLeft:'3%'}}>Ratings and Reviews</h2>
      <RatingsAndReviewsContainer>
        <RatingsContainer>
          <Ratings
          meta={this.props.store.state.meta}
          filterReviews= {this.filterReviews}
          filteredFor= {this.state.filteredFor}/>
        </RatingsContainer>
        <div >
          <div style= {{ minWidth:'300px', height: '30px', width:'40%',border:`2px solid ${this.props.theme.blkGry}`, margin: '20px', marginLeft:'0px'}}> <i style= {{fontSize: '95%', margin: '3px'}} className="lni lni-32 lni-search-alt"></i><input placeholder= 'Search Reviews' style= {{height: '27px', width:'90%', border:`none`, outline:'none' , background:`${this.props.theme.invertWht}`, color: `${this.props.theme.blkGry}`}} type= 'text' onChange = {(event)=> this.searchReviews(event.target.value)}></input></div>
          <Reviews key={this.state.reviewsToShow}
            reviewsToShow ={this.state.reviewsToShow}
            product = {this.props.store.state.product}
            productId = {this.props.store.state.currentProductId}
            meta= {this.props.store.state.meta}
            setMeta= {this.props.store.setMeta}
            setReviews={this.props.store.setReviews}
            sortReviews= {this.sortReviews}
            theme={this.props.theme}
            searchReviews= {this.searchReviews}
            searchTerm={this.state.searchTerm}
            />
        </div>

      </RatingsAndReviewsContainer>
    </section>
    );
}
}






export default RatingsReviews;


