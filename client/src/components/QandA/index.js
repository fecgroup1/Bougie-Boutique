import React, {Fragment} from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Answers from './Answers.js'

class QandA extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questionLength: 2,
      moreQuestions: false,
      questionMarkedHelpful: [],
      qReported: []
    }
    this.addMore = this.addMore.bind(this)
    this.renderQuestion = this.renderQuestion.bind(this)
    this.markHelpful = this.markHelpful.bind(this)
    this.reportQuestion = this.reportQuestion.bind(this)
  }

  getQuestions() {
    const qid = this.props.store.state.currentProductId
  }

  markHelpful(question) {
    const prevMarked = this.state.questionMarkedHelpful
    const qid = question.question_id;
    if (prevMarked.includes(question.question_id)) {
      return;
    } else {
      this.setState({questionMarkedHelpful: [...prevMarked, question.question_id]})
      axios.put(`qa/questions/${qid}/helpful`, null)
      question.question_helpfulness += 1
    }
  }

  reportQuestion(question) {
    const prevReported = this.state.qReported;
    const qid = question.question_id;
    this.setState({qReported: [...prevReported, question.question_id]})
    // axios.put(`qa/questions/${qid}/report`, null)
    console.log(question)
    question.reported = true;
  }

  renderQuestion(question, index) {
    const report = (this.state.qReported.includes(question.question_id))
    const qDate = new Date(question.question_date)
    return (
      <div className='Question' key={index}>
        <div>
          <p id='questionBody' className='questionLine1'> Q: {question.question_body}</p>
          <p id='qHelpful' className='questionLine1'>Helpful?
            <span id='helpfulButton' onClick={() => this.markHelpful(question)}> Yes </span>
            ({question.question_helpfulness}) {' | '}
            {!report ?
              (
              <span id='reportButton' onClick={() => this.reportQuestion(question)}>Report</span>
              ) :
              (
              <span>Reported</span>
              )
            }

          </p>
        </div>
        <Answers key={index} questionId={question.question_id} answers={question.answerArr}/>
      </div>
    )
  }

  addMore() {
    const add = this.state.questionLength + 2
    if (add >= this.props.store.state.qa.questions.length) {
      this.setState({moreQuestions: true, questionLength: add})
    } else
      this.setState({questionLength: add})
  }

  render () {
    if (this.props.store.state.qa !== undefined) {
      var store = this.props.store.state
      return(
        <Fragment>
            <h2>Questions and Answers</h2>
            <div className='QABody'>
            {store.qa.questions.slice(0, this.state.questionLength).map((question, index) =>
            (this.renderQuestion(question, index)))}
            {!this.state.moreQuestions ?
              (
                <div>
                  <button id='moreQuestions' onClick={this.addMore}>MORE ANSWERED QUESTIONS</button>
                </div>
              )
              :
              (
                <div>

                </div>
              )
            }
            </div>
        </Fragment>
      )
    } else {
      return (<div>Loading...</div>)
    }
  }
}

export default QandA;