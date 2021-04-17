const router = require('express').Router();
const controllers = require('./../controllers');

router.route('/:pid')
.get((req, res) => {
  var pid = req.params.pid;
  controllers.product.getAll(pid)
  .then((fnlRes) => {
    res.send(fnlRes);
  })
  .catch((err) => {
    console.log('Error in product router getting all data', err);
    res.status(500)
    res.end();
  });
});

router.route('/related')
.post((req, res) => {
  // console.log('this is occuring on line 6', req.body);
  let promises = req.body.pids.map((pid) => {
    return controllers.product.getForRelated(pid);
  });
  // console.log('these are the promises for the api:', promises);
  Promise.all(promises)
  .then((data) => {
    console.log('data results: ', data)
    res.send(data);
  })

});

module.exports = router;