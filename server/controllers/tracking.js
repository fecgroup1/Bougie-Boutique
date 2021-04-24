const axios = require('axios')
const TOKEN = process.env.TOKEN || require('../../config.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo'

module.exports = {
  postClick: (click) => {
    return axios.post(`${url}/interactions`, click)
    .then((response) => response)
    .catch((err) => err);
  }
}