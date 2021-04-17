const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
const TOKEN = process.env.TOKEN || require('../../config.js');
const axios = require('axios');

axios.defaults.headers.common['Authorization'] = TOKEN;

module.exports = {

  getMeta: (productId) => {
    var calcualteAverage = this.calcualteAverage;
    return axios.get(`${url}/reviews/meta?product_id=${productId}`)
    .then((response) => {
      let metaData = {
        ratings: response.data.ratings,
        recommended: response.data.recommended,
        characteristics: response.data.characteristics,
        averageRating: calcualteAverage(response.data.ratings),
        starRating: Math.round( 4 *  calcualteAverage(response.data.ratings)) /4
      }
      return metaData;
    })
    .catch((err) => {
      console.log(err);
    })
  },


  calculateAverage:(ratingsObj)=> {
    var total= 0;
    var count = 0;
    total += ratingsObj['1'] *1;
    count += ratingsObj['1'];
    total += ratingsObj['2'] *2;
    count += ratingsObj['2'];
    total += ratingsObj['3'] *3;
    count += ratingsObj['3'];
    total += ratingsObj['4'] *4;
    count += ratingsObj['4'];
    total += ratingsObj['5'] *5;
    count += ratingsObj['5'];
    var average= total/count
    return Math.round( 10* average) /10;
  },

  getReviews: (productId)=> {
    return axios.get(`${url}/reviews/?product_id=${productId}`)
      .then((response) => {
        let reviews = [];
        var listOfReviews= response.data.results;
        for (var i=0; i< listOfReviews.length; i++){
          var currentReview = listOfReviews[i];
          reviews.push({
            rating:currentReview.rating,
            date:currentReview.date,
            summary: currentReview.summary,
            body: currentReview.body,
            photos: currentReview.photos,
            recommended: currentReview.recommend,
            reviewerName: currentReview.reviewer_name,
            responceToReview: currentReview.responce,
            helpfulness: currentReview.helpfulness
          })
        }
        return reviews;
    })
    .catch((err)=> {
      console.log(err)
    })
  }
}

