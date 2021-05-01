import React, { Fragment, useEffect, useState } from 'react';
import Answers from './Answers.js'
import AddAnswer from './AddAnswer.js'
import axios from 'axios'
import { ThemeToggle, QuestionHead, QuestionsButtons, HelpfulButton, ReportButton, HelpfulBar } from '../../Styles'

const RenderQuestion = (props) => {
  const [newAnswer, setNewAnswer] = useState(null)
  const [questionMarkedHelpful, setQuestionMarkedHelpful] = useState([]);
  const [qReported, setQReported] = useState([]);

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

  const tempBody = (escape(props.question.question_body))
  const report = (qReported.includes(props.question.question_id))
  const qDate = new Date(props.question.question_date)
  return (
    <div className='Question' key={props.index}>
      <QuestionHead>
        <p style={{display: 'inline-block', maxWidth: '50%', fontWeight: 'bold', fontSize: '18px'}}> Q: {tempBody}</p>
        <HelpfulBar>Helpful?
          <HelpfulButton data-testid='questionHelpful' onClick={() => markHelpful(props.question)}> Yes </HelpfulButton>
          ({props.question.question_helpfulness}) | <AddAnswer question={props.question} setNewAnswer={setNewAnswer} product={props.product}/>
        </HelpfulBar>
      </QuestionHead>
      <Answers key={props.index} questionId={props.question.question_id} currentProductId={props.productId} newAnswer={newAnswer} getAnswers={props.getAnswers}/>
      <span style={{fontSize: '16px', marginTop: '10px', marginBottom: '20px', display: 'inline'}}>
        Asked by: {props.question.asker_name}, {qDate.toDateString().substring(4)}
        <span style={{marginLeft: '15px'}}>|</span>
        {!report ?
            (
            <ReportButton data-testid='questionReport' onClick={() => reportQuestion(props.question)}>Report <i className="lni lni-flag-alt"/></ReportButton>
            ) :
            (
            <span style={{color: 'red', fontSize: '14px', marginLeft: '15px'}}>Reported <i className="lni lni-flag-alt"></i></span>
            )
          }
      </span>
    </div>
  )

}

export default RenderQuestion