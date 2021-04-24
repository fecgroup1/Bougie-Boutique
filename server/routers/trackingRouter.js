const express = require('express');
const router = express.Router();
const controllers = require('./../controllers');

router.route('/')
.post((req, res) => {
  let click = req.body
  controllers.tracking.postClick(req.body)
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    res.send(err);
  })
});


module.exports = router;