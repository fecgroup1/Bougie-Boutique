import React, {Fragment} from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Answers from './Answers.js'
import AddQuestion from './AddQuestion.js'
import AddAnswer from './AddAnswer.js'
import { QuestionsContainer, QAContainer } from '../../Styles'

class QandA extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      questionLength: 2,
      moreQuestions: false,
      questionMarkedHelpful: [],
      qReported: []
    }
    this.addMore = this.addMore.bind(this)
    this.renderQuestion = this.renderQuestion.bind(this)
    this.markHelpful = this.markHelpful.bind(this)
    this.reportQuestion = this.reportQuestion.bind(this)
    this.escape = this.escape.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
  }

  getQuestions() {
    const qid = this.props.store.state.currentProductId
    axios.get(`qa/questions?product_id=${qid}&count=50`)
    .then((question) => {
      this.setState({questions: question.data.results})
    })
  }

  componentDidMount() {
    this.getQuestions()
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
    axios.put(`qa/questions/${qid}/report`, null)
    question.reported = true;
  }

  escape (html) {
    return String(html)
      .replace(new RegExp("&"+"#"+"x27;", "g"), "'")
  }

  renderQuestion(question, index, product) {
    const tempBody = (this.escape(question.question_body))
    const report = (this.state.qReported.includes(question.question_id))
    const qDate = new Date(question.question_date)
    return (
      <div className='Question' key={index}>
        <div>
          <p id='questionBody' className='questionLine1'> Q: {tempBody}</p>
          <span id='qHelpful' className='questionLine1'>Helpful?
            <span id='helpfulButton' className='questionLine1' onClick={() => this.markHelpful(question)}> Yes </span>
            ({question.question_helpfulness}) | <AddAnswer question={question} name={product}/>
          </span>

        </div>
        <Answers key={index} questionId={question.question_id}/>
        <div className='askerInfo'>
          Asked by: {' '}{question.asker_name},{' '}{qDate.toDateString().substring(4)}{' '}|{' '}
          {!report ?
              (
              <span id='reportButton' onClick={() => this.reportQuestion(question)}>Report</span>
              ) :
              (
              <span>Reported</span>
              )
            }
        </div>
      </div>
    )
  }

  addMore() {
    console.log(this.state.questionLength)
    const add = this.state.questionLength + 2
    if (add >= this.state.questions.length) {
      this.setState({moreQuestions: true, questionLength: add})
    } else
      this.setState({questionLength: add})
  }

  render () {
    if (this.props.store.state.product !== undefined) {
      var store = this.props.store.state
      return(
        <QAContainer>
            <h2>Questions and Answers</h2>
            <QuestionsContainer className='QABody'>
            {this.state.questions.slice(0, this.state.questionLength).map((question, index) =>
            (this.renderQuestion(question, index, store.product.name)))}
            </QuestionsContainer>
            <QuestionsContainer>
            {!this.state.moreQuestions ?
              (
                <div>
                  <button id='moreQuestions' onClick={this.addMore}>MORE ANSWERED QUESTIONS</button>
                  <AddQuestion currentProductId={store.currentProductId } name={store.product.name}/>
                </div>
              )
              :
              <AddQuestion currentProductId={store.currentProductId} name={store.product.name}/>
            }
            </QuestionsContainer>
        </QAContainer>
      )
    } else {
      return (<div>Loading questions</div>)
    }
  }
}

export default QandA;