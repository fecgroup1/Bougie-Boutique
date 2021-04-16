const express = require('express');
const App = express();
const path = require('path')
const routers = require('./routers');
cosnt bodyParser = require('./body-parser')


var port = 33212;

App.use(bodyParser.json());

App.use(express.static(__dirname + '../client/dist'));

App.use('/product', routers.productRouter);

App.use('/reviews', router.reviewRouter);

App.use('/qa', router.qaRouter);

App.listen(port, ()=> {
  console.log(`listening on ${port}`);
})
