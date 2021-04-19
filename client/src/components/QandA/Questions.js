import React from 'react';
import axios from 'axios';

class Questions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product: props.currentProductId,
      questions: [],
      moreQuestions: false
    }
    this.addMore = this.addMore.bind(this)
    this.renderQuestion = this.renderQuestion.bind(this)
  }

  getQuestions () {
    if (this.state.product) {
      var qid = this.state.product
      axios.get(
        `/qa/questions?product_id=${qid}`
      )
      .then((question) => {
        this.setState({questions: question.data.results})
      })
    }
  }

  componentDidMount() {
    this.getQuestions()
  }

  renderQuestion(question, index) {
    const qDate = new Date(question.question_date)
    return (
      <div className='Question' key={index}>
        <div>
          <p> Q: {question.question_body}</p>
          <div className='qBody'>
            <p>Helpful?
              <span> Yes </span>
              {question.question_helpfulness}
            </p>
          </div>
        </div>
      </div>
    )
  }

  addMore() {
    console.log('hello!')
  }

  render () {
    return(
      <div>
        {this.state.questions.slice(0, 2).map((question, index) =>
        (this.renderQuestion(question, index)))}
        {!this.state.moreQuestions ?
          (
            <div>
              <button onClick={this.addMore}>MORE ANSWERED QUESTIONS</button>
            </div>
          ) :
          <div></div>
        }
      </div>
    )
  }

}

export default Questions;