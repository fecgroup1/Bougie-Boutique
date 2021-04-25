import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Answers from './Answers.js'
import AddQuestion from './AddQuestion.js'
import AddAnswer from './AddAnswer.js'
import SearchQuestions from './SearchQuestions.js'
import ProductAPI from '../../Utils/ProductAPI';
import { QuestionsContainer, QAContainer, QuestionCardsContainer, ThemeToggle, QuestionHead, QuestionsButtons } from '../../Styles'

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [newAnswer, setNewAnswer] = useState(null)
  const [newQuestion, setNewQuestion] = useState(null)
  const [questionLength, setQuestionLength] = useState(2);
  const [searchQuestionLength, setSearchQuestionLength] = useState(2);
  const [moreQuestions, setMoreQuestions] = useState(false);
  const [moreSearchedQuestions, setMoreSearchedQuestions] = useState(false);
  const [questionMarkedHelpful, setQuestionMarkedHelpful] = useState([]);
  const [qReported, setQReported] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setQuestionLength(2)
    setSearchQuestionLength(2)
    setMoreQuestions(false)
    setMoreSearchedQuestions(false)
    setSearchQuery('')
    setSearchResults([])
    getQuestions();
  }, [props.productId, props.name])

  useEffect(() => {
    console.log('i got a new question')
    getQuestions()
  }, [newQuestion])


  const getQuestions = () => {
    const qid = props.productId
    axios.get(`qa/questions?product_id=${qid}&count=50`)
    .then((question) => {
      setQuestions(question.data.results)
      console.log(question)
    })
  }

  const markHelpful = (question) => {
    const prevMarked = questionMarkedHelpful
    const qid = question.question_id;
    if (prevMarked.includes(question.question_id)) {
      return;
    } else {
      setQuestionMarkedHelpful([...prevMarked, question.question_id])
      axios.put(`qa/questions/${qid}/helpful`, null)
      question.question_helpfulness += 1
    }
  }

  const filterQuestions = (event) => {
    const queryString = event.target.value
    setSearchQuery(queryString)
    setMoreSearchedQuestions(false)
    setSearchQuestionLength(2)
    if (queryString.length >= 3) {
      const match = questions.filter ((question) =>
        question.question_body.toLowerCase().includes(queryString.toLowerCase()))
        setSearchResults(match)
    } else {
      setSearchResults(questions)
    }
  }

  const reportQuestion = (question) => {
    const prevReported = qReported;
    const qid = question.question_id;
    setQReported([...prevReported, question.question_id])
    axios.put(`qa/questions/${qid}/report`, null)
    question.reported = true;
  }

  const escape = (html) => {
    return String(html)
      .replace(new RegExp("&"+"#"+"x27;", "g"), "'")
  }

  const renderQuestion = (question, index, product) => {
    const tempBody = (escape(question.question_body))
    const report = (qReported.includes(question.question_id))
    const qDate = new Date(question.question_date)
    return (
      <div className='Question' key={index}>
        <QuestionHead>
          <p id='questionBody'> Q: {tempBody}</p>
          <span id='qHelpful'>Helpful?
            <span id='helpfulButton' onClick={() => markHelpful(question)}> Yes </span>
            ({question.question_helpfulness}) | <AddAnswer question={question} setNewAnswer={setNewAnswer} name={props.name}/>
          </span>
        </QuestionHead>

        <Answers key={index} questionId={question.question_id} newAnswer={newAnswer}/>
        <div className='askerInfo'>
          Asked by: {' '}{question.asker_name},{' '}{qDate.toDateString().substring(4)}{' '}|{' '}
          {!report ?
              (
              <span id='reportButton' onClick={() => reportQuestion(question)}>Report</span>
              ) :
              (
              <span>Reported</span>
              )
            }
        </div>
      </div>
    )
  }

  const addMore = (event) => {
    if (event.target.value === 'search') {
      const addSearch = searchQuestionLength + 2
      if (addSearch >= searchResults.length) {
        setMoreSearchedQuestions(true)
        setSearchQuestionLength(addSearch)
        console.log(searchQuestionLength)
      } else {
        setSearchQuestionLength(addSearch)
      }
    }
    const add = questionLength + 2
    if (add >= questions.length) {
      setMoreQuestions(true)
      setQuestionLength(add)
    } else
      setQuestionLength(add)
  }

  return (
  <QAContainer
    tracking={'Questions and Answers'}
  >
    {questions.length > 0 ?
    (
    <Fragment>
    <QuestionsContainer>
      <h2>Questions and Answers</h2>
      <SearchQuestions currentProductId={props.productId} filterQuestions={filterQuestions}/>
      <QuestionCardsContainer>
        {searchQuery.length >= 3 ? (
          <Fragment>
            {searchResults.slice(0, searchQuestionLength).map((question, index) =>
            (renderQuestion(question, index)))}
          </Fragment>
        )
        :
        (<Fragment>
            {questions.slice(0, questionLength).map((question, index) =>
            (renderQuestion(question, index)))}
        </Fragment>

        )}
      </QuestionCardsContainer>
    </QuestionsContainer>
    <QuestionsContainer>
    {searchResults.length > 0 && searchQuery.length >=3 ? (
      <Fragment>
        {!moreSearchedQuestions && searchResults.length >  2 ?
        (
          <div>
            <QuestionsButtons value={'search'} onClick={addMore}>MORE ANSWERED QUESTIONS</QuestionsButtons>
            <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} name={props.name}/>
          </div>
        )
        :
        <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} name={props.name}/>
        }
      </Fragment>
      )
      :
      (
      <Fragment>
        {!moreQuestions && questions.length >  2?
        (
          <div>
            <QuestionsButtons onClick={addMore}>MORE ANSWERED QUESTIONS</QuestionsButtons>
            <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} name={props.name}/>
          </div>
        )
        :
        <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} name={props.name}/>
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
    <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} name={props.name}/>
  </QuestionsContainer>

  )
  }
  </QAContainer>
  )
}


export default Questions;