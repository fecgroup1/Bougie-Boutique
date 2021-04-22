const axios = require('axios');
const TOKEN = process.env.TOKEN || require('../../config.js');
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
  }

  /*
  getQA: (productId) => {
    const qaData = {}
    return axios({
      method: 'GET',
      url: `${url}/qa/questions/?product_id=${productId}&count=50`,
      headers: {
        'Authorization': `${TOKEN}`
      }
    })
      .then((response) => {
        const questionsArr = []
        const qid = response.data.results.map(item => {
          questionsArr.push(item.question_id.toString())
        })
        qaData.questions = response.data.results
        let answerPromise = questionsArr.map((qid) => {
          return axios({
            method: 'GET',
            url: `${url}/qa/questions/${qid}/answers?count=50`,
            headers: {
              'Authorization': `${TOKEN}`
             }
          })
        })
        return Promise.all(answerPromise)
          .then((answers) => {
            for (let i = 0; i < qaData.questions.length; i++) {
              qaData.questions[i].answerArr = answers[i].data.results
            }
            return qaData
          })
    })
      .then((data) => {
        return data
    })
      .catch((err) => {
        console.log(err)
    })
  }
*/
}