import axios from 'axios';

const ProductAPI = {
  getProduct: (pid) => {
    return axios.get(`/product?pid=${pid}`)
    .then((results) => {
      return results.data;
    })
    .catch((err) => {
      return err;
    })
  },
}

export default ProductAPI;