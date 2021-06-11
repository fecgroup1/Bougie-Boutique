import axios from 'axios'

const questionsAPI = {
  getQuestions: (pid) => {
    return axios.get(`http://54.67.42.76/qa/question/?product_id=${pid}&count=50`)
    .then((question) => {
      console.log(question)
      return question.data.results
    })
    .catch((err) => {
      console.log(err)
    })
  },

  getAnswers: (qid) => {
    return axios.get(`http://54.67.42.76/qa/question/${qid}/answers?count=50`)
    .then ((answersArr) => {
      return answersArr.data.results
    })
    .catch ((err) => {
      return (err)
    })
  }
}

export default questionsAPI