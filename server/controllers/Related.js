const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
const TOKEN = process.env.TOKEN || require('../../config.js')
const axios = require('axios');
const ProductController = require('./Product.js')

axios.defaults.headers.common['Authorization'] = TOKEN;

module.exports = {
  getRelatedProducts: (pid) => {
    return ProductController.getRelated(pid)
    .then((related) => {
      console.log('this is the related', related)
      return related.map((id) => {
        return ProductController.getDetailsSlim(id)
      })
    })
    .then((promises) => {
      return Promise.all(promises)
    })
    .catch((err) => {
      console.log('Error getting data for getRelatedProducts', err);
      return err
    })
  }
}