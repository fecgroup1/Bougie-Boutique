const router = require('express').Router();
const Axios = require('axios');
const TOKEN = require('./../config.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';

axios.defaults.headers.common['Authorization'] = TOKEN;

router.route()

router.route('/:pid/related')
.get((req, res) => {
req.body.map((pid) => {
  getProductData(pid);
})
}

router.route('/:pid')
.get((req, res) => {
let fnlRes;
  getProductData(pid)
  .then((productData) => {
    fnlRes.product = productData;
    getRelatedProducts()
    .then((relatedProducts) => {

    }).then((getReviews) => {

    })
  })
});

getProductData = (pid) => {
  return axios.get(`${url}/${pid}`)
    .then((response) => {
      let productData = {
        name: response.data.name,
        slogan: response.data.slogan,
        description: response.data.slogan,
        category: response.data.category,
        features: response.data.features,
      };
      return productData;
    })
    .catch((err) => {
      return null;
    })
};

getStyles = (productId) => {
  return axios.get(`${url}/${pid}/styles`)
    .then((response) => {
      return response.data.results;
    })
    .catch((err) => {
      return null;
    })
};

  getRelatedProducts: (productId) => {

  },

  getReviews: (productId) => {

  },

  getMeta: (productId) => {
    // call calcStars here
  },

  module.exports = router;