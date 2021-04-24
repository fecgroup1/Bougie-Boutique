import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerPhotos from './AnswerPhotos.js'

const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [moreAnswers, setMoreAnswers] = useState(false);
  const [helpful, setHelpful] = useState(false);
  const [answerMarkedHelpful, setAnswerMarkedHelpful] = useState([]);
  const [aReported, setAReported] = useState([]);

  useEffect(() => {
    setMoreAnswers(false)
    getAnswers();
  }, [props.questionId, props.newAnswer])


  const getAnswers = () => {
    const id = props.questionId
    axios.get(`/qa/questions/${id}/answers`)
    .then ((answersArr) => {
      setAnswers(answersArr.data.results)
    })
    .catch ((err) => {
      console.log(err)
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
          <p style={{fontWeight: 'bold'}}className='answerText'> A: </p>
          <div id='answerBody' className='answerText'>{tempBody}</div>
          <div>
           <AnswerPhotos answer={answer} key={index}/>
          </div>
          {answer.answerer_name === 'Seller' ? (
            <div>
              <span className='answererInfo'>by
              <span style={{fontWeight: 'bold'}}>{answer.answerer_name}</span>
              , {aDate.toDateString().substring(4)}
              </span>
              <span id='answerHelpful'>|</span>
              <span id='answerHelpful' className='answererInfo'> Helpful?
                <span id='helpfulButton' onClick={() => markHelpful(answer)}>Yes</span>
                ({answer.helpfulness})
                <span id='answerHelpful'></span>
                {!report ?
                  (
                  <span id='reportButton' onClick={() => reportAnswer(answer)}>Report</span>
                  ) :
                  (
                  <span>Reported</span>
                  )
                }
              </span>
            </div>
          )
          :
          (
            <div>
              <span className='answererInfo'>
                by {answer.answerer_name}, {aDate.toDateString().substring(4)}
              </span>
              <span id='answerHelpful'>|</span>
              <span id='answerHelpful' className='answererInfo'> Helpful?
                <span id='helpfulButton' onClick={() => markHelpful(answer)}> Yes </span>
                ({answer.helpfulness})
                <span id='answerHelpful'>|</span>
                {!report ?
                  (
                  <span id='reportButton' onClick={() => reportAnswer(answer)}>Report</span>
                  ) :
                  (
                  <span>Reported</span>
                  )
                }
              </span>
              </div>
          )}
        </div>
      </div>
    )
  }


  if (props.questionId !== undefined) {
    var storeAnswers = props.answers
    return (
      <div>
        {!moreAnswers ?
          (
            <div>
              {answers.slice(0, 2).map((answer, index) =>
              (renderAnswer(answer, index)))}
              {answers.length > 2 ? <a id='moreAnswers' onClick={getMore}>More answers...</a> : null}
            </div>
          )
          :
          (
            <div>
                {answers.map((answer, index) => (renderAnswer(answer, index)))}
                {answers.length > 2 ? <a id='moreAnswers' onClick={collapse}>Collapse answers</a> : null}
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