const express = require('express');
const App = express();
const path =require('path')

var port = 3321;

app.use(express.static('../client/dist'));

App.listen(port, ()=>{ console.log(`listening on ${port}`)})
