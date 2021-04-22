// const getRelatedAPI = (productIds) => {
//   let data = {pids: productIds}
//   return fetch('/product/related', {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   .then((data) => data.json());
// }
const RelatedAPI = {
  getRelatedProducts : (pid) => {
    return fetch(`/product/related?pid=${pid}`)
    .then((data) => data.json());
  }
}

//test getRelated API
// getRelatedAPI([
//   13024
// ])
// .then((data) => console.log(data))

export default RelatedAPI;