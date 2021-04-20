import React from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Answers from './Answers.js'

class QandA extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      moreQuestions: false,
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

  renderQuestion(question, index) {
    const qDate = new Date(question.question_date)
    return (
      <div className='Question' key={index}>
        <div>
          <p> Q: {question.question_body}</p>
          <div className='qBody'>
            <p>Helpful?
              <span> Yes </span>
              ({question.question_helpfulness})
            </p>
          </div>
        </div>
        <Answers key={index} questionId={question.question_id} product={this.props.currentProductId}/>
      </div>
    )
  }

  addMore() {
    console.log('hello!')
  }

  render () {
    if (this.props.store.state.qa !== undefined) {
      var store = this.props.store.state
      return(
        <div>
          {store.qa.slice(0, 2).map((question, index) =>
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
    } else {
      return <div>Loading...</div>
    }
  }
}

export default QandA;