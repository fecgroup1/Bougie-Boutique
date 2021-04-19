import React from 'react';
import axios from 'axios';

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
      console.log(answers.data.results)
      this.setState({answers: answers.data.results})
    })
  }

  componentDidMount() {
    this.getAnswers()
  }

  render() {
    return (
      <div>sup</div>
    )
  }
}

export default Answers