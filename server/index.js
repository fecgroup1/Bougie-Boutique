const express = require('express');
const app = express();
const routers = require('./routers');
const bodyParser = require('body-parser')
const controller = require('./controllers')
const morgan = require('morgan')

const port = 33212;

app.use(morgan('dev'))

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/product', routers.productRouter);

// app.use('/reviews', routers.reviewRouter);

app.use('/qa', controller.qa.getQA);

app.listen(port, ()=> {
  console.log(`listening on ${port}`);
})
