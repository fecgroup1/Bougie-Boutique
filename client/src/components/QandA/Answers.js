import React from 'react';
import axios from 'axios';
import AnswerPhotos from './AnswerPhotos.js'

class Answers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      question: props.questionId,
      answers: [],
      moreAnswers: false,
      helpful: false
    }
    this.getMore = this.getMore.bind(this)
    this.collapse = this.collapse.bind(this)
  }

  getAnswers () {
    const id = this.state.question;
    axios.get(
      `/qa/questions/${id}/answers`
    )
    .then((answers) => {
      this.setState({answers: answers.data.results})
    })
  }

  getMore() {
    this.setState({moreAnswers: true})
  }

  collapse() {
    this.setState({moreAnswers: false})
  }

  componentDidMount() {
    this.getAnswers()
  }
  renderAnswer(answer, index) {
    const aDate = new Date(answer.date)
    return (
      <div className='Answer' key={index}>
        <div>
          <p> A: {answer.body}</p>
          <div>
           <AnswerPhotos answer={answer} key={index}/>
          </div>
          {answer.answerer_name === 'Seller' ? (
            <div>
              <p>by {' '}
              <span style={{fontWeight: 'bold'}}>{answer.answerer_name}</span>
              ,{' '} {aDate.toDateString()}
              </p>
            </div>
          )
          :
          (
            <div>
              <p>
                by {' '} {answer.answerer_name}, {' '} {aDate.toDateString().substring(4)}
              </p>
              </div>
          )}
        </div>
      </div>
    )
  }

  render () {
    return(
      <div>
        {!this.state.moreAnswers ?
          (
            <div>
              {this.state.answers.slice(0, 2).map((answer, index) =>
              (this.renderAnswer(answer, index)))}
              {this.state.answers.length > 2 ? <button onClick={this.getMore}>More answers...</button> : null}
            </div>
          )
          :
          (
            <div>
               {this.state.answers.map((answer, index) => (this.renderAnswer(answer, index)))}
               {this.state.answers.length > 2 ? <button onClick={this.collapse}>Collapse answers</button> : null}
            </div>
          )

        }
      </div>
    )
  }

}

export default Answers