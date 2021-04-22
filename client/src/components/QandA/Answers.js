import React from 'react';
import axios from 'axios';
import AnswerPhotos from './AnswerPhotos.js'

class Answers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      moreAnswers: false,
      helpful: false,
      answerMarkedHelpful: [],
      aReported: []
    }
    this.getMore = this.getMore.bind(this)
    this.collapse = this.collapse.bind(this)
    this.reportAnswer = this.reportAnswer.bind(this)
    this.escape = this.escape.bind(this)
  }

  getMore() {
    this.setState({moreAnswers: true})
  }

  collapse() {
    this.setState({moreAnswers: false})
  }

  markHelpful(answer) {
    const prevMarked = this.state.answerMarkedHelpful
    const id = answer.answer_id;
    if (prevMarked.includes(answer.answer_id)) {
      return;
    } else {
      this.setState({answerMarkedHelpful: [...prevMarked, answer.answer_id]})
      axios.put(`qa/answers/${id}/helpful`, null)
      answer.helpfulness += 1
    }
  }

  reportAnswer(answer) {
    const prevReported = this.state.aReported;
    const id = answer.answer_id;
    this.setState({aReported: [...prevReported, answer.answer_id]})
    axios.put(`qa/answers/${id}/report`, null)
    answer.reported = true;
  }

  escape (html) {
    return String(html)
      .replace(new RegExp("&"+"#"+"x27;", "g"), "'")
  }

  renderAnswer(answer, index) {
    const tempBody = (this.escape(answer.body))
    const report = (this.state.aReported.includes(answer.answer_id))
    const aDate = new Date(answer.date)
    return (
      <div className='answerContainer' key={index}>
        <div>
          <p style={{fontWeight: 'bold'}}className='answerText'> A: </p>
          <div id='answerBody' className='answerText'>{<>{tempBody}</>}</div>
          <div>
           <AnswerPhotos answer={answer} key={index}/>
          </div>
          {answer.answerer_name === 'Seller' ? (
            <div>
              <p className='answererInfo'>by {' '}
              <span style={{fontWeight: 'bold'}}>{answer.answerer_name}</span>
              ,{' '} {aDate.toDateString().substring(4)}
              </p>
              <p id='answerHelpful' className='answererInfo'>| Helpful?
                <span id='helpfulButton' onClick={() => this.markHelpful(answer)}> Yes </span>
                ({answer.helpfulness}) {' | '}
                {!report ?
                  (
                  <span id='reportButton' onClick={() => this.reportAnswer(answer)}>Report</span>
                  ) :
                  (
                  <span>Reported</span>
                  )
                }
              </p>
            </div>
          )
          :
          (
            <div>
              <p className='answererInfo'>
                by {' '} {answer.answerer_name}, {' '} {aDate.toDateString().substring(4)}
              </p>
              <p id='answerHelpful' className='answererInfo'>| Helpful?
                <span id='helpfulButton' onClick={() => this.markHelpful(answer)}> Yes </span>
                ({answer.helpfulness}) {' | '}
                {!report ?
                  (
                  <span id='reportButton' onClick={() => this.reportAnswer(answer)}>Report</span>
                  ) :
                  (
                  <span>Reported</span>
                  )
                }
              </p>
              </div>
          )}
        </div>
      </div>
    )
  }

  render () {
    if (this.props.answers !== undefined) {
      var storeAnswers = this.props.answers
      return (
        <div>
          {!this.state.moreAnswers ?
            (
              <div>
                {storeAnswers.slice(0, 2).map((answer, index) =>
                (this.renderAnswer(answer, index)))}
                {storeAnswers.length > 2 ? <button id='moreAnswers' onClick={this.getMore}>More answers...</button> : null}
              </div>
            )
            :
            (
              <div>
                  {storeAnswers.map((answer, index) => (this.renderAnswer(answer, index)))}
                  {storeAnswers.length > 2 ? <button id='moreAnswers' onClick={this.collapse}>Collapse answers</button> : null}
              </div>
            )

          }
        </div>
      )
    }
  }
}

export default Answers