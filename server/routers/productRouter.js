const router = require('express').Router();
const controllers = require('./../controllers');

router.route('/')
.get((req, res) => {
  let pid = req.query.pid;
  console.log(pid);
  controllers.product.getOverviewData(pid)
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
  let promises = req.body.pids.map((pid) => {
    return controllers.product.getDetails(pid);
  });
  Promise.all(promises)
  .then((data) => {
    res.send(data);
  })

})

router.route('/related')
.get((req, res) => {
  let pid = req.query.pid;
  console.log('this is the pid', pid)
  controllers.related.getRelatedProducts(pid)
  .then((response) => {
    res.send(response)
  })
})

module.exports = router;