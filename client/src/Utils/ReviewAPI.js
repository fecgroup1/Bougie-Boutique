import axios from 'axios';



const ReviewAPI = {
  getReviews: (product_id) {
    axios.get(`/reviews?product_id=${product_id}`)
    . then((data)=> data)
    .catch((err)=> err)
  },

  getMeta:(product_id) {
    axios.get(`/reviews/meta?product_id=${product_id}`)
    . then((data)=> data)
    .catch((err)=> err)
  }
};

export default ReviewAPI;

console.log(ReviewAPI.getMeta('13023'))
