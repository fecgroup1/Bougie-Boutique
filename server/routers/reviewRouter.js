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
    .then((response)=>res.end())
    .catch((err) => res.status(500));
  })


router.route('/:review_id/report')
  .put((req, res)=> {
    controllers.review.reportReview(req.params.review_id)
    .then(()=>res.end())
    .catch((err) => res.status(500));
  })

router.route('/:review_id/helpful')
  .put((req, res)=> {
    controllers.review.markHelpful(req.params.review_id)
    .then(()=>res.end())
    .catch((err) => res.status(500));
  })

router.route('/meta')
  .get((req, res) => {
    controllers.review.getMeta(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  });

module.exports = router;
