import React from 'react';
import axios from 'axios';
import AnswerPhotos from './AnswerPhotos.js'

class Answers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      question: props.questionId,
      answers: [],
      moreAnswers: false
    }
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

  componentDidMount() {
    this.getAnswers()
  }
  renderAnswer(answer, index) {

    const aDate = new Date(answer.date)
    return (
      <div className='Answer' key={index}>
        <div>
          <p> A: {answer.body}</p>
          <div className='aBody'>
            <p>Helpful?
              <span> Yes </span>
              ({answer.helpfulness})
            </p>
          </div>
          <div>
            <AnswerPhotos answer={answer} key={index}/>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return(
      <div>
        {this.state.answers.slice(0, 10).map((answer, index) =>
        (this.renderAnswer(answer, index)))}
        {!this.state.moreAnswers ?
          (
            <div>
              <button onClick={this.addMore}>More answers...</button>
            </div>
          ) :
          <div></div>
        }
      </div>
    )
  }

}

export default Answers