import axios from 'axios';
const RelatedAPI = {
  getRelatedProducts: (pid) => {
    return axios.get(`/product/related?pid=${pid}`)
    .then((results) => results.data);
  }
}

export default RelatedAPI;