const RelatedAPI = {
  getRelatedProducts: (pid) => {
    return fetch(`/product/related?pid=${pid}`)
    .then((data) => data.json());
  }
}

export default RelatedAPI;