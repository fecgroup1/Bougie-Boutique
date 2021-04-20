const router = require('express').Router();
const controllers = require('./../controllers');

router.route('/')
.get((req, res) => {
  let pid = req.query.pid;
  console.log(pid);
  controllers.product.getAll(pid)
  .then((fnlRes) => {
    res.send(fnlRes);
  })
  .catch((err) => {
    // console.log('Error in product router getting all data', err);
    res.status(500)
    res.end();
  });
});

router.route('/related')
.post((req, res) => {
  console.log('testing: ', req.body)
  let promises = req.body.pids.map((pid) => {
    return controllers.product.getDetails(pid);
  });
  Promise.all(promises)
  .then((data) => {
    res.send(data);
  })

});

module.exports = router;