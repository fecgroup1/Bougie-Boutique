import axios from 'axios'

const questionsAPI = {
  getQuestions: (pid) => {
    return axios.get(`qa/questions?product_id=${pid}&count=50`)
    .then((question) => {
      return question.data.results
    })
    .catch((err) => {
      console.log('err')
    })
  },

  getAnswers: (qid) => {
    return axios.get(`/qa/questions/${qid}/answers?count=50`)
    .then ((answersArr) => {
      return answersArr.data.results
    })
    .catch ((err) => {
      return (err)
    })
  }
}

export default questionsAPI