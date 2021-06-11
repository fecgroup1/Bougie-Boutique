import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MoreAnswers, HelpfulButton, ReportButton } from '../../Styles'
import AnswerPhotos from './AnswerPhotos.js'

const RenderAnswer = ({answer, index}) => {
  const [helpful, setHelpful] = useState(false);
  const [answerMarkedHelpful, setAnswerMarkedHelpful] = useState([]);
  const [aReported, setAReported] = useState([]);

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

  const tempBody = (escape(answer.answer_body))
  const report = (aReported.includes(answer.a_id))
  const aDate = new Date(answer.answer_date)

  return (
    <div aria-label='renderedAnswer' className='answerContainer' key={index}>
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
              <HelpfulButton data-testid='answerHelpful' onClick={() => markHelpful(answer)}> Yes </HelpfulButton>
              ({answer.answer_helpfulness})
              <span style={{marginLeft: '15px'}}>|  </span>
              {!report ?
                (
                <ReportButton data-testid='answerReport' onClick={() => reportAnswer(answer)}>Report <i className="lni lni-flag-alt"></i></ReportButton>
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
              <HelpfulButton data-testid='answerHelpful' onClick={() => markHelpful(answer)}> Yes </HelpfulButton>
              ({answer.answer_helpfulness})
              <span style={{marginLeft: '15px'}}>|</span>
              {!report ?
                (
                <ReportButton data-testid='answerReport' onClick={() => reportAnswer(answer)}>Report <i className="lni lni-flag-alt"></i></ReportButton>
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

export default RenderAnswer