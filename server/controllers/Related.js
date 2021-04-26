const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';
const TOKEN = process.env.TOKEN || require('../../config.js')
const axios = require('axios');
const ProductController = require('./Product.js');
const NodeCache = require('node-cache');

const relatedCache = new NodeCache();

axios.defaults.headers.common['Authorization'] = TOKEN;

module.exports = {
  getRelatedProducts: (pid) => {
    let relatedResults = []
    return ProductController.getRelated(pid)
    .then((related) => {
      // console.log('this is the related', related)
      // console.log('this is the related cache', relatedCache)
      let promises = []
      related.forEach((id) => {
        let check = relatedCache.get(`${id}`)
        console.log('here is the check', check)
        if (check) {
          relatedResults.push(check);
        } else {
          promises.push(ProductController.getDetailsSlim(id));
        }
      })
      return promises;
    })
    .then((promises) => {
      if (promises) {
        return Promise.all(promises)
      }
      console.log('current related results:', relatedResults.length)
    })
    .then((results) => {
      if (results) {
        results.map((product) => {
          relatedCache.set(`${product.currentProductId}`, product);
          relatedResults.push(product)
        })
      }
      console.log('Final related results:', relatedResults.length)
      return relatedResults
    })
    .catch((err) => {
      console.log('Error getting data for getRelatedProducts', err);
      return err
    })
  }
}