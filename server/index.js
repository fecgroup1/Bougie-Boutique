const express = require('express');
const App = express();
const path = require('path')
const routers = require('./routers');
const bodyParser = require('body-parser')


var port = 33212;

App.use(bodyParser.json());

App.use(express.static(__dirname + '/../client/dist'));

// App.get('/', (req, res) => {
//   res.send('public')
// })

App.use('/product', routers.productRouter);

// App.use('/reviews', routers.reviewRouter);

// App.use('/qa', routers.qaRouter);

App.listen(port, ()=> {
  console.log(`listening on ${port}`);
})
