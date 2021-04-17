const express = require('express');
const app = express();
const routers = require('./routers');
const bodyParser = require('body-parser')
const qaController = require('./controllers/QandA.js')


var port = 33212;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/product', routers.productRouter);

// app.use('/reviews', routers.reviewRouter);

// app.use('/qa', qaController);

app.listen(port, ()=> {
  console.log(`listening on ${port}`);
})
