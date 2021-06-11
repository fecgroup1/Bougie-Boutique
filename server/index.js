const express = require('express');
const path = require('path');
const app = express();
const routers = require('./routers');
const bodyParser = require('body-parser')
const controller = require('./controllers')
const morgan = require('morgan')
const request = require('supertest');
const multer = require('multer')
const storage = multer.memoryStorage()
var form = multer({dest: 'form/', storage: storage})
const port = 33212;

const redirectUnmatched = (req, res) => {
  let url = req.url;
  let index = req.url.indexOf('/');
  let pid = url.slice(index+1);
  res.redirect(`/?pid=${pid}`);
};

app.use(morgan('dev'))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/../client/dist'));

app.use('/product', routers.productRouter);

app.use('/reviews', routers.reviewRouter);

// app.use('/qa', controller.qa.qaController);

app.use('/addPhoto', form.single('image'), controller.s3);

app.use('/tracking', routers.trackingRouter);

app.use(redirectUnmatched);

app.listen(port, ()=> {
  console.log(`listening on ${port}`);
})



module.exports = app;