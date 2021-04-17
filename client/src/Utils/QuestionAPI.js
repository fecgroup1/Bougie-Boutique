import axios from 'axios'

const qaAPI = {
  getQuestions: (productId) => {
    axios.get(`/qa/questions?product_id=${productId}`)
      .then ((questions) => {
        return questions.data.results;
      })
      .catch((err) => {
        return err;
      })
  },

  getAnswers: (questionId) => {
    axios.get(`/qa/questions/${questionId}/answers`)
      .then((answers) => {
        return answers.data.results
      })
      .catch((err) => {
        return err;
      })
  }
}

export default qaAPI