const router = require('express').Router();
<<<<<<< HEAD
const controllers = require('../controllers');

router.route('/')
  .get((req, res) => {
    controllers.review.getReviews(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  });

router.route('/meta')
  .get((req, res) => {
    controllers.review.getMeta(req.query.product_id)
      .then((data) => res.send(data))
      .catch((err) => res.end(err));
  });

module.exports = router;
=======
const controllers = require('./../controllers');

 router.route('/')
 .get((req, res)=>{
   controllers.review.getReviews(req.query.product_id)
   .then((data)=> res.send(data))
   .catch((err)=>res.end())
 })


 module.exports = router;
>>>>>>> add route for /reviews that gets reviews based on product id
