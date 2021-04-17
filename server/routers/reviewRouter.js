const router = require('express').Router();
const controllers = require('./../controllers');

 router.route('/')
 .get((req, res)=>{
   controllers.review.getReviews(req.query.product_id)
   .then((data)=> res.send(data))
   .catch((err)=>res.end())
 })


 module.exports = router;
