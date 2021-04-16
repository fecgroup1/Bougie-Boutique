const express = require('express');
const app = express();
const path = require('path')
const routers = require('./routers');
const bodyParser = require('body-parser')


var port = 33212;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/product', routers.productRouter);

// App.use('/reviews', routers.reviewRouter);

// App.use('/qa', routers.qaRouter);

app.listen(port, ()=> {
  console.log(`listening on ${port}`);
})
