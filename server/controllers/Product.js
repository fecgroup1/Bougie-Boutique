const controllers = require('./index.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
const TOKEN = process.env.TOKEN || require('../../config.js')
const axios = require('axios');

axios.defaults.headers.common['Authorization'] = TOKEN;

module.exports = {

  // ******************************************
  // BATCH GETS
  // ******************************************
  getOverviewData: (pid) => {
    let fnlRes = {currentProductId: pid};
    return module.exports.getProduct(pid)
    .then((productData) => {
      fnlRes.product = productData;
      return module.exports.getStyles(productData.id);
    })
    .then((stylesData) => {
      fnlRes.styles = stylesData;
      return fnlRes;
    //   return controllers.review.getMeta(pid)
    // })
    // .then((metaData) => {
    //   fnlRes.meta = metaData;
    //   return controllers.review.getReviews(pid)
    // })
    // .then((reviewsData) => {
    //   fnlRes.reviews = reviewsData;
    //   return fnlRes;
    })
    .catch((err) => {
      console.log('Error getting data for related', err);
      throw err;
    })
  },

  getDetailsSlim: (pid) => {
    let fnlRes = {currentProductId: pid};
    return module.exports.getProduct(pid)
    .then((productData) => {
      fnlRes.product = productData;
      return module.exports.getStyles(pid)
    })
    .then((stylesData) => {
      fnlRes.styles = stylesData;
      return controllers.review.getMeta(pid)
    })
    .then((metaData) => {
      fnlRes.meta = metaData;
      return fnlRes;
    })
    .catch((err) => {
      console.log('Error getting data for related', err);
      return fnlRes;
    })
  },

  // ******************************************
  // INDIVIDUAL GETS
  // ******************************************
  getProduct: (pid) => {
    return axios.get(`${url}products/${pid}`)
      .then((response) => {
        let productData = {
          id: response.data.id,
          name: response.data.name,
          slogan: response.data.slogan,
          description: response.data.description,
          category: response.data.category,
          features: response.data.features,
        };
        return productData;
      })
      .catch((err) => {
        console.log('Error getting product data', err);
        throw err;
      })
  },

  getStyles: (pid) => {
    return axios.get(`${url}products/${pid}/styles`)
      .then((response) => {
        let styleData = response.data.results;
        let newData = [];
        for (let i = 0; i < styleData.length; i++) {
          newData.push(styleData[i]);
          let skuArr = [];
          for (let sku in styleData[i].skus) {
            let skuData = styleData[i].skus[sku];
            skuData.sku = sku;
            skuArr.push(skuData);
          }
          newData[i].skus = skuArr;
        }
        return newData;
      })
      .catch((err) => {
        console.log('Error getting styles', err);
        return null;
      })
  },

  getRelated: (pid) => {
    return axios.get(`${url}products/${pid}/related`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log('Error getting related products', err)
        return null;
      })
  }
};