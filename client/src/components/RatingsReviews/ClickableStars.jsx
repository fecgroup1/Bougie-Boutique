import React from 'react';

const ClickableStars = ({ starStyles, highlightStars }) => (
<span style={{'fontFamily': 'FontAwesome', 'color':'#DFDFDF' }}id= 'starRating'>
        <label ><i style ={starStyles.one} class="far fa-star"></i><input style ={{'display': 'none'}} type="radio" name="overallRating" value="1" id='1' onClick= {(event)=> highlightStars(event.target.value)} required></input></label>
        <label><i style ={starStyles.two} class="far fa-star"></i><input style ={{'display': 'none'}} type="radio" name="overallRating" value="2" id='2' onClick= {(event)=> highlightStars(event.target.value)}></input></label>
        <label><i  style ={starStyles.three} class="far fa-star"></i><input style ={{'display': 'none'}} type="radio" name="overallRating" value="3" id='3' onClick= {(event)=> highlightStars(event.target.value)}></input></label>
        <label><i  style ={starStyles.four} class="far fa-star"></i><input style ={{'display': 'none'}} type="radio" name="overallRating" value="4" id='4' onClick= {(event)=> highlightStars(event.target.value)}></input></label>
        <label><i  style ={starStyles.five} class="far fa-star"></i><input style ={{'display': 'none'}} type="radio" name="overallRating" value="5" id='5' onClick= {(event)=> highlightStars(event.target.value)}></input></label>
      </span>
);

export default ClickableStars;
