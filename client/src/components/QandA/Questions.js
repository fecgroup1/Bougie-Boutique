import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Answers from './Answers.js'
import RenderQuestion from './RenderQuestion.js'
import AddQuestion from './AddQuestion.js'
import AddAnswer from './AddAnswer.js'
import SearchQuestions from './SearchQuestions.js'
import QuestionsAPI from '../../Utils/QuestionAPI';
import { QuestionsContainer, QAContainer, QuestionCardsContainer, ThemeToggle, QuestionHead, QuestionsButtons, HelpfulButton, ReportButton, HelpfulBar } from '../../Styles'

const Questions = (props) => {
  const [loadedQuestions, setLoadedQuestions] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState(null)
  const [questionLength, setQuestionLength] = useState(2);
  const [searchQuestionLength, setSearchQuestionLength] = useState(2);
  const [moreQuestions, setMoreQuestions] = useState(false);
  const [moreSearchedQuestions, setMoreSearchedQuestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    setLoadedQuestions(false)
    setQuestionLength(2)
    setSearchQuestionLength(2)
    setMoreQuestions(false)
    setMoreSearchedQuestions(false)
    setSearchQuery('')
    setSearchResults([])
    props.getQuestions(props.productId)
      .then((result) => {
        setQuestions(result)
        setLoadedQuestions(true)
      })
      .catch((err) => {
        setLoadedQuestions(false)
        console.log(err)
      })
  }, [props.productId])

  useEffect(() => {
    props.getQuestions(props.productId)
    .then((result) => {
      setQuestions(result)
      setLoadedQuestions(true)
    })
    .catch((err) => {
      setLoadedQuestions(false)
      console.log(err)
    })
  }, [newQuestion])

  const filterQuestions = (event) => {
    if (event.target.value.length < 3) {
      setSearch(false)
    } else {
      setSearch(true)
    }
    const queryString = event.target.value
    setSearchQuery(queryString)
    setMoreSearchedQuestions(false)
    setSearchQuestionLength(2)
    if (queryString.length >= 3) {
      const match = questions.filter ((question) =>
        question.question_body.toLowerCase().includes(queryString.toLowerCase()))
        setSearchResults(match)
        if (searchResults[0] === undefined) {
          setMoreSearchedQuestions(true)
        }
    } else {
      setSearchResults(questions)
    }
  }

  const unlimitedScroll = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 1 && moreQuestions && !search) {
      if (questionLength < questions.length) {
        setQuestionLength(questionLength + 2)
      }
    }
    if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 1 && moreSearchedQuestions && search) {
      if (searchQuestionLength < questions.length) {
      setSearchQuestionLength(searchQuestionLength + 2)
      }
    }
  }

  const addMore = (event) => {
    if (event.target.value === 'search') {
      setMoreSearchedQuestions(true)
      const addSearch = searchQuestionLength + 2
      setSearchQuestionLength(addSearch)
    } else {
      setMoreQuestions(true)
      const add = questionLength + 2
      setQuestionLength(add)
    }
  }

  return (
  <QAContainer
    tracking={'Questions and Answers'}
  >
    {loadedQuestions & questions[0] !== undefined ?
    (
    <Fragment>
    <QuestionsContainer>
      <h2>Questions and Answers</h2>
      <SearchQuestions data-testid='test' currentProductId={props.productId} filterQuestions={filterQuestions}/>
      <QuestionCardsContainer onScroll={unlimitedScroll}>
        {searchQuery.length >= 3 ? (
          <Fragment>
            {searchResults.slice(0, searchQuestionLength).map((question, index) =>
            <RenderQuestion question={question} key={index} product={props.product}
            productId={props.productId} getAnswers={props.getAnswers}/>
            )}
          </Fragment>
        )
        :
        (<Fragment>
            {questions.slice(0, questionLength).map((question, index) =>
            <RenderQuestion question={question} key={index} product={props.product}
            productId={props.productId} getAnswers={props.getAnswers}/>
            )}
        </Fragment>

        )}
      </QuestionCardsContainer>
    </QuestionsContainer>
    <QuestionsContainer>
    {searchResults.length === 0 && searchQuery.length >=3 ? (<h4>There are no questions that match this search</h4>) : null}
    {searchResults.length > 0 && searchQuery.length >=3 ? (
      <Fragment>
        {!moreSearchedQuestions && searchResults.length >  2 ?
        (
          <div>
            <QuestionsButtons value={'search'} onClick={addMore}>MORE ANSWERED QUESTIONS</QuestionsButtons>
            <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} product={props.product}/>
          </div>
        )
        :
        <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} product={props.product}/>
        }
      </Fragment>
      )
      :
      (
      <Fragment>
        {!moreQuestions && questions.length >  2 && !search?
        (
          <div>
            <QuestionsButtons onClick={addMore}>MORE ANSWERED QUESTIONS</QuestionsButtons>
            <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} product={props.product}/>
          </div>
        )
        :
        <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} product={props.product}/>
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
    <h4 aria-label='questionNull'>There are no questions for this product... Please add a question!</h4>
    <AddQuestion currentProductId={props.productId} setNewQuestion={setNewQuestion} product={props.product}/>
  </QuestionsContainer>

  )
  }
  </QAContainer>
  )
}


export default Questions;