// const axios = require('axios');
// const TOKEN = process.env.TOKEN || require('../../config.js');
// const url = 'http://localhost:3000'

// module.exports = {
//   qaController: (req, res) => {
//     const method = req.method;
//     const path = req.url;
//     const reqBody = req.body;

//     axios({
//       method: `${method}`,
//       url: url + `/qa${path}`,
//       headers: {
//         'authorization': `${TOKEN}`
//       },
//       data: reqBody
//     })
//       .then((response) => {
//         res.send(response.data)
//       })
//       .catch((err) => {
//         res.send(err)
//       })
//   }
// }