import React {Fragment} from 'react';

class SearchQuestions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      list: []
    }
    this.filterQuestions = this.filterQuestions.bind(this)
  }

  filterQuestions(event) {
    const queryString = event.target.value
    this.setState({query: queryString})
    if (queryString.length >= 3) {
      const match = this.props.questions.filter ((question) =>
        question.question_body.toLowerCase().includes(queryString.toLowerCase()))
    } else {
      this.setState({list: this.props.questions})
    }
  }

  render() {
    return (
      <Fragment>
        <div className='searchQuestion'>
          <input id='searchQuestionInput' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
          onChange={this.filterQuestions}/>
          <button type='submit'>Search</button>
        </div>
      </Fragment>
    )
  }
}