const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
const axios = require('axios');
const TOKEN = process.env.TOKEN || require('../../config.js');

axios.defaults.headers.common.Authorization = TOKEN;

module.exports = {

  getMeta: (productId) => {
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
          responseToReview: currentReview.response,
          helpfulness: currentReview.helpfulness,
        });
      }
      return reviews;
    })
    .catch((err) => {
      console.log(err);
    }),


    postReviews: (postobj) => {
      console.log(postobj)
      return axios.post(`${url}reviews`, postobj)
        .then((response) => response)
        .catch((err) => {
          console.log(err);
        });
      }
};


