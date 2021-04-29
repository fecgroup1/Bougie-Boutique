import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreAnswers, HelpfulButton, ReportButton } from '../../Styles'
import AnswerPhotos from './AnswerPhotos.js'

const Answers = (props) => {
  const [loadedAnswers, setLoadedAnswers] = useState(false)
  const [answers, setAnswers] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(false);
  const [helpful, setHelpful] = useState(false);
  const [answerMarkedHelpful, setAnswerMarkedHelpful] = useState([]);
  const [aReported, setAReported] = useState([]);

  useEffect(() => {
    setLoadedAnswers(false)
    setMoreAnswers(false)
    getAnswers();
  }, [props.questionId, props.newAnswer, props.currentProductId])


  const getAnswers = () => {
    const id = props.questionId
    axios.get(`/qa/questions/${id}/answers?count=50`)
    .then ((answersArr) => {
      setAnswers(answersArr.data.results)
      setLoadedAnswers(true);
    })
    .catch ((err) => {
      setLoadedAnswers(false);
    })
  }

  const getMore = () => {
    setMoreAnswers(true)
  }

  const collapse = () => {
    setMoreAnswers(false)
  }

  const markHelpful = (answer) => {
    const prevMarked = answerMarkedHelpful
    const id = answer.answer_id;
    if (prevMarked.includes(answer.answer_id)) {
      return;
    } else {
      setAnswerMarkedHelpful([...prevMarked, answer.answer_id])
      axios.put(`qa/answers/${id}/helpful`, null)
      answer.helpfulness += 1
    }
  }

  const reportAnswer = (answer) => {
    const prevReported = aReported;
    const id = answer.answer_id;
    setAReported([...prevReported, answer.answer_id])
    axios.put(`qa/answers/${id}/report`, null)
    answer.reported = true;
  }

  const escape = (html) => {
    return String(html)
      .replace(new RegExp("&"+"#"+"x27;", "g"), "'")
  }

  const renderAnswer = (answer, index) => {
    const tempBody = (escape(answer.body))
    const report = (aReported.includes(answer.answer_id))
    const aDate = new Date(answer.date)
    return (
      <div className='answerContainer' key={index}>
        <div>
          {index === 0 ?
          <p style={{fontWeight: 'bold', display: 'inline-block', marginBottom: '10px'}}> A: </p>
          :
          null
          }
          {index === 0 ?
            <div style={{fontSize: '15px', maxWidth: '75%', paddingTop: '3px', verticalAlign: 'text-top', marginLeft: '10px',
              display: 'inline-block', marginBottom: '10px'}}>{tempBody}</div>
            :
            <div style={{fontSize: '15px', maxWidth: '75%', paddingTop: '3px', verticalAlign: 'text-top', marginLeft: '26px',
              display: 'inline-block', marginBottom: '10px'}}>{tempBody}</div>
          }
          <div>
           <AnswerPhotos answer={answer} key={index}/>
          </div>
          {answer.answerer_name.toLowerCase() === 'seller' ? (
            <div>
              <span style={{opacity: '0.7', fontSize: '14px', marginLeft: '26px', marginBottom: '20px', display: 'inline-block'}}>by
              <span style={{fontWeight: '900'}}> {answer.answerer_name}</span>
              , {aDate.toDateString().substring(4)}
              </span>
              <span style={{marginLeft: '15px'}}>|</span>
              <span style={{marginLeft: '15px', fontSize: '14px', marginBottom: '20px', display: 'inline-block'}}> Was this answer helpful?
                <HelpfulButton onClick={() => markHelpful(answer)}> Yes </HelpfulButton>
                ({answer.helpfulness})
                <span style={{marginLeft: '15px'}}>|  </span>
                {!report ?
                  (
                  <ReportButton onClick={() => reportAnswer(answer)}>Report <i className="lni lni-flag-alt"></i></ReportButton>
                  ) :
                  (
                  <span style={{color: 'red', fontSize: '14px', marginLeft: '15px'}}>Reported <i className="lni lni-flag-alt"></i></span>
                  )
                }
              </span>
            </div>
          )
          :
          (
            <div>
              <span style={{opacity: '0.7', fontSize: '14px', marginLeft: '26px', marginBottom: '20px', display: 'inline-block'}} className='answererInfo'>
                by {answer.answerer_name}, {aDate.toDateString().substring(4)}
              </span>
              <span style={{marginLeft: '15px'}}>|</span>
              <span style={{marginLeft: '15px', fontSize: '14px', marginBottom: '20px', display: 'inline-block'}} className='answererInfo'> Was this answer helpful?
                <HelpfulButton onClick={() => markHelpful(answer)}> Yes </HelpfulButton>
                ({answer.helpfulness})
                <span style={{marginLeft: '15px'}}>|</span>
                {!report ?
                  (
                  <ReportButton onClick={() => reportAnswer(answer)}>Report <i className="lni lni-flag-alt"></i></ReportButton>
                  ) :
                  (
                  <span style={{color: 'red', fontSize: '14px', marginLeft: '15px'}}>Reported <i className="lni lni-flag-alt"></i></span>
                  )
                }
              </span>
              </div>
          )}
        </div>
      </div>
    )
  }


  if (loadedAnswers) {
    return (
      <div>
        {!moreAnswers ?
          (
            <div>
              {answers.slice(0, 2).map((answer, index) =>
              (renderAnswer(answer, index)))}
              {answers.length > 2 ? <MoreAnswers onClick={getMore}>See more answers</MoreAnswers> : null}
            </div>
          )
          :
          (
            <div>
                {answers.map((answer, index) => (renderAnswer(answer, index)))}
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