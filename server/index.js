const express = require('express');
const App = express();
const path =require('path')

var port = 33212;

App.use(express.static(__dirname + '../client/dist'));

App.get('/', (req,res) => {
  res.send('')
});

App.listen(port, ()=>{ console.log(`listening on ${port}`)})
