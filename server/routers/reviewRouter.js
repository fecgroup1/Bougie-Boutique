const router = require('express').Router();
const controllers = require('../controllers');

router.route('/')
  .get((req, res) => {
    controllers.review.getReviews(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  })
  .post((req, res) => {
    controllers.review.postReviews(req.body)
    .then((response)=>res.end(response))
    .catch((err) => res.end(err));
  })


router.route('/:review_id/report')
 .put((req, res)=> {
    controllers.review.reportReview(req.params.reviewId)
    .then((response)=>res.end(response))
    .catch((err) => res.end(err));
  })

router.route('/meta')
  .get((req, res) => {
    controllers.review.getMeta(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  });

module.exports = router;
