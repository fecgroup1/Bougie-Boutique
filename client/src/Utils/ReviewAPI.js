import axios from 'axios';

const ReviewAPI = {
  getReviews: (product_id)=> {
    axios.get(`/reviews?product_id=${product_id}`);
  },

  getMeta:(product_id)=> {
    axios.get(`/reviews/meta?product_id=${product_id}`);
  }
};

export default ReviewAPI;

