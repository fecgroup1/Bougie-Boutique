const router = require('express').Router();
const controllers = require('../controllers');

router.route('/')
  .get((req, res) => {
    controllers.review.getReviews(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  })
  .post((req, res) => {
    console.log(req);
    res.end()
  });


router.route('/meta')
  .get((req, res) => {
    controllers.review.getMeta(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  });

module.exports = router;
