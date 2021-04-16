module.exports = {

  getProductData: (pid) => {
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
  },

  getStyles: (productId) => {
    return axios.get(`${url}/${pid}/styles`)
      .then((response) => {
        return response.data.results;
      })
      .catch((err) => {
        return null;
      })
  },
};