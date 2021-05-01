import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreAnswers, HelpfulButton, ReportButton } from '../../Styles'
import AnswerPhotos from './AnswerPhotos.js'
import RenderAnswer from './RenderAnswer.js'
import QuestionsAPI from '../../Utils/QuestionAPI';

const Answers = (props) => {
  const [loadedAnswers, setLoadedAnswers] = useState(false)
  const [answers, setAnswers] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(false);

  useEffect(() => {
    setLoadedAnswers(false)
    setMoreAnswers(false)
    QuestionsAPI.getAnswers(props.questionId)
      .then((result) => {
        setAnswers(result)
        setLoadedAnswers(true)
      })
      .catch((err) => {
        setLoadedAnswers(false)
        console.log(err)
      })
  }, [props.questionId, props.newAnswer, props.currentProductId])

  const getMore = () => {
    setMoreAnswers(true)
  }

  const collapse = () => {
    setMoreAnswers(false)
  }

  if (loadedAnswers) {
    return (
      <div>
        {!moreAnswers ?
          (
            <div>
              {answers.slice(0, 2).map((answer, index) =>
              <RenderAnswer answer={answer} key={index}/>)}
              {answers.length > 2 ? <MoreAnswers onClick={getMore}>See more answers</MoreAnswers> : null}
            </div>
          )
          :
          (
            <div>
                {answers.map((answer, index) => <RenderAnswer answer={answer} key={index}/>)}
                {answers.length > 2 ? <MoreAnswers onClick={collapse}>Collapse answers</MoreAnswers> : null}
            </div>
          )

        }
      </div>
    )
  } else {
    return (<div>Loading answers...</div>)
  }

}

export default Answers