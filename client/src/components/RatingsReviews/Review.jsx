import React, {useState} from 'react';
import { SingleReview} from '../../Styles'
import { StarsOuter, StarsInner} from '../../Styles/'
import Stars from '../Overview/Styles/Stars.js'
import axios from 'axios';
import ReviewPhoto from './ReviewPhoto'

const reportReview = (reviewId)=>{
  axios.put(`/reviews/${reviewId}/report`)
}
const markHelpful = (reviewId)=>{
  axios.put(`/reviews/${reviewId}/helpful`)
}

const Review =({ review })=> {
const[reported, setReported]= useState(false);
const[helpful, setHelpful]= useState(false);
const[modalOpen, setModalOpen]= useState(false);
const[fullReview, setFullReview]= useState(false);

return(
  <SingleReview>
    <StarsOuter>
      <StarsInner rating={review.rating}/>
    </StarsOuter>
    <span style={{float: 'right'}}>{review.reviewerName},   {new Date(review.date).toLocaleString('en-us', {month:'long', day: 'numeric', year: 'numeric'})}</span>
    <h3>{review.summary}</h3>
    {fullReview || review.body.length < 251 ? <p>{review.body}</p> : <p>{review.body.slice(0,250)}<br></br><a onClick= {()=> setFullReview(true)}>...Show More</a></p>}
    {review.photos.map((photo)=> <ReviewPhoto photo= {photo}/>)}
    {review.recommended ? <p style={{fontSize:'90%'}}> &#10003; I recomend this product</p> : <div></div>}
    {review.responseToReview ? <p style={{fontSize:'90%', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>Response from seller:  {review.responseToReview}</p> : <div></div>}
    <div style={{fontSize:'90%'}}>
      <span>Was this review helpful? </span>
      {!helpful? <a onClick={()=> {markHelpful(review.review_id); setHelpful(true)}} style={{margin:'10px'}}>Yes({review.helpfulness})</a>: <span style={{margin:'10px'}}>Yes({review.helpfulness +1})</span>}
      <span style={{marginLeft:'10px', marginRight:'15px'}}>|</span>
      {!reported? <a onClick={()=>{reportReview(review.review_id); setReported(true)}}>Report<i className="lni lni-flag-alt"></i> </a> : <a style={{color:'red'}}>Reported<i className="lni lni-flag-alt"></i> </a>}

    </div>
  </SingleReview>
);

}


export default Review;