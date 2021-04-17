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

  let promises = req.body.pids.map((pid) => {
    return controllers.product.getAll(pid);
  });

  Promise.all(promises)
  .then((data) => {
    res.send(data);
  })

});

module.exports = router;