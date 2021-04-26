import axios from 'axios';

const RelatedAPI = {
  getRelatedProducts: (pid) => {
    return axios.get(`/product/related?pid=${pid}`)
    .then((results) =>
    {
      console.log('this is the results.data',results.data)
      return results.data
    });
  }
}

export default RelatedAPI;