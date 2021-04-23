import React, { Fragment } from 'react';
import axios from 'axios';
import Answers from './Answers.js'
import AddQuestion from './AddQuestion.js'
import AddAnswer from './AddAnswer.js'
import SearchQuestions from './SearchQuestions.js'
import { QuestionsContainer, QAContainer, QuestionCardsContainer, NavButton } from '../../Styles'

class QandA extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      questionLength: 2,
      searchQuestionLength: 2,
      moreQuestions: false,
      moreSearchedQuestions: false,
      questionMarkedHelpful: [],
      qReported: [],
      searchQuery: '',
      searchResults: []
    }
    this.addMore = this.addMore.bind(this)
    this.renderQuestion = this.renderQuestion.bind(this)
    this.markHelpful = this.markHelpful.bind(this)
    this.reportQuestion = this.reportQuestion.bind(this)
    this.escape = this.escape.bind(this)
    this.getQuestions = this.getQuestions.bind(this)
    this.filterQuestions = this.filterQuestions.bind(this)
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

  filterQuestions(event) {
    const queryString = event.target.value
    this.setState({searchQuery: queryString, moreSearchedQuestions: false, searchQuestionLength: 2})
    if (queryString.length >= 3) {
      const match = this.state.questions.filter ((question) =>
        question.question_body.toLowerCase().includes(queryString.toLowerCase()))
        this.setState({searchResults: match})
    } else {
      this.setState({searchResults: this.state.questions})
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

  addMore(event) {
    if (event.target.value === 'search') {
      const addSearch = this.state.searchQuestionLength + 2
      if (addSearch >= this.state.searchResults.length) {
        this.setState({moreSearchQuestions: true, searchQuestionLength: addSearch})
      } else {
        this.setState({searchQuestionLength: addSearch})
      }
    }
    const add = this.state.questionLength + 2
    if (add >= this.state.questions.length) {
      this.setState({moreQuestions: true, questionLength: add})
    } else
      this.setState({questionLength: add})
  }

  render () {
    if (this.props.store.state.product !== undefined) {
      var store = this.props.store.state
      return (
      <QAContainer>
        {this.state.questions.length > 0 ?
        (
        <Fragment>
        <QuestionsContainer>
          <h2>Questions and Answers</h2>
          <SearchQuestions filterQuestions={this.filterQuestions}/>
          <QuestionCardsContainer>
            {this.state.searchQuery.length >= 3 ? (
              <Fragment>
                {console.log(this.state.searchResults)}
                {this.state.searchResults.slice(0, this.state.searchQuestionLength).map((question, index) =>
                (this.renderQuestion(question, index, store.product.name)))}
              </Fragment>
            )
            :
            (<Fragment>
                {this.state.questions.slice(0, this.state.questionLength).map((question, index) =>
                (this.renderQuestion(question, index, store.product.name)))}
            </Fragment>

            )}
          </QuestionCardsContainer>
        </QuestionsContainer>
        <QuestionsContainer>
        {this.state.searchResults.length > 0 && this.state.searchQuery.length >=3 ? (
          <Fragment>
            {!this.state.moreSearchedQuestions && this.state.searchResults.length >  2 ?
            (
              <div>
                <button id='moreQuestions' value={'search'} onClick={this.addMore}>MORE ANSWERED QUESTIONS</button>
                <AddQuestion currentProductId={store.currentProductId } name={store.product.name}/>
              </div>
            )
            :
            <AddQuestion currentProductId={store.currentProductId} name={store.product.name}/>
           }
          </Fragment>
          )
          :
          (
          <Fragment>
            {!this.state.moreQuestions && this.state.questions.length >  2?
            (
              <div>
                <button id='moreQuestions' onClick={this.addMore}>MORE ANSWERED QUESTIONS</button>
                <AddQuestion currentProductId={store.currentProductId } name={store.product.name}/>
              </div>
            )
            :
            <AddQuestion currentProductId={store.currentProductId} name={store.product.name}/>
          }
            </Fragment>
        )}

        </QuestionsContainer>
        </Fragment>
      )
      :
      (
      <QuestionsContainer>
        <h2>Questions and Answers</h2>
        <h4>There are currently no questions... Please add a question!</h4>
        <AddQuestion currentProductId={store.currentProductId} name={store.product.name}/>
      </QuestionsContainer>

      )
      }
      </QAContainer>
      )
    } else {
      return (<div>Loading questions</div>)
    }
  }
}

export default QandA;