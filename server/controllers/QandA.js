const axios = require('axios');
const TOKEN = require('./../../config.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo'

module.exports = {
  qaController: (req, res) => {
    const method = req.method;
    const path = req.url;
    const reqBody = req.body;

    axios({
      method: `${method}`,
      url: url + `/qa${path}`,
      headers: {
        'authorization': `${TOKEN}`
      },
      data: reqBody
    })
      .then((response) => {
        res.send(response.data)
      })
      .catch((err) => {
        res.send(err)
      })
  },

  getQA: (productId) => {
    return axios({
      method: 'GET',
      url: `${url}/qa/questions/?product_id=${productId}`,
      headers: {
        'Authorization': `${TOKEN}`
      }
    })
      .then((response) => {
        return response.data.results
      })
  },

  getAnswers: (questionId) => {
    return axios({
      method: 'GET',
      url: `${url}/qa/questions/${questionId}/answers`,
      headers: {
        'Authorization': `${TOKEN}`
      }
    })
      .then((response) => {
        return response.data.results
      })
  }


}

/*
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
*/