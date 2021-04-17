const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
const axios = require('axios');
const TOKEN = process.env.TOKEN || require('../../config.js');

<<<<<<< HEAD
axios.defaults.headers.common.Authorization = TOKEN;
=======

axios.defaults.headers.common['Authorization'] = TOKEN;
>>>>>>> GetMata and GetReviews return promise that resolves to desired data

module.exports = {

  getMeta: (productId) => {
<<<<<<< HEAD
    const { calculateAverage } = module.exports;
    return axios.get(`${url}reviews/meta?product_id=${productId}`)
      .then((response) => {
        const metaData = {
          ratings: response.data.ratings,
          recommended: response.data.recommended,
          characteristics: response.data.characteristics,
          averageRating: calculateAverage(response.data.ratings),
          starRating: Math.round(4 * calculateAverage(response.data.ratings)) / 4,
        };
        return metaData;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  calculateAverage: (ratingsObj) => {
    let total = 0;
    let count = 0;
    for (var key in ratingsObj) {
      total += Number(ratingsObj[key]) * Number(key);
      count += Number(ratingsObj[key]);
    }
    const average = total / count;
    return Math.round(10 * average) / 10;
  },

  getReviews: (productId) => axios.get(`${url}reviews?product_id=${productId}`)
    .then((response) => {
      const reviews = [];
      const listOfReviews = response.data.results;
      for (let i = 0; i < listOfReviews.length; i++) {
        const currentReview = listOfReviews[i];
        reviews.push({
          rating: currentReview.rating,
          date: currentReview.date,
          summary: currentReview.summary,
          body: currentReview.body,
          photos: currentReview.photos,
          recommended: currentReview.recommend,
          reviewerName: currentReview.reviewer_name,
          responceToReview: currentReview.responce,
          helpfulness: currentReview.helpfulness,
        });
      }
      return reviews;
=======
    var  calculateAverage = module.exports.calculateAverage;
    return axios.get(`${url}reviews/meta?product_id=${productId}`)
    .then((response) => {
      let metaData = {
        ratings: response.data.ratings,
        recommended: response.data.recommended,
        characteristics: response.data.characteristics,
        averageRating: calculateAverage(response.data.ratings),
        starRating: Math.round( 4 * calculateAverage(response.data.ratings)) /4
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
    for (key in ratingsObj){
      total +=  Number(ratingsObj[key]) * Number(key)
      count +=  Number(ratingsObj[key])
    }
    var average= total/count
    return Math.round( 10* average) /10;
  },

  getReviews: (productId)=> {
    return axios.get(`${url}reviews?product_id=${productId}`)
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
>>>>>>> GetMata and GetReviews return promise that resolves to desired data
    })
    .catch((err) => {
      console.log(err);
    }),
};

<<<<<<< HEAD
// module.exports.getReviews('13023').then((data)=> console.log('this is reviews', data))
=======

//module.exports.getReviews('13023').then((data)=> console.log('this is reviews', data))




>>>>>>> GetMata and GetReviews return promise that resolves to desired data
