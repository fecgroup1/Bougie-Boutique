import React, {Fragment} from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Modal from 'react-modal'


//Will implement photos later

class AddAnswer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      chars: 1000
    }
    this.submitForm = this.submitForm.bind(this)
    this.openModal = this.openModal.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
    this.charsLeft = this.charsLeft.bind(this)
  }

  openModal(event) {
    event.preventDefault()
    this.setState({open: true})

  }

  cancelForm() {
    this.setState({open: false})
  }

  charsLeft (e) {
    const remaining = 1000 - e.target.value.length;
    this.setState({chars: remaining })
  }

  submitForm(event) {
    event.preventDefault();
    let answerBody = document.getElementById('answerInputText')
    let nickname = document.getElementById('answerNickname')
    let email = document.getElementById('answerEmail')

    if ((answerBody.validity.valid) && (nickname.validity.valid)
        && email.validity.valid) {
      const qid = this.props.question.question_id;
      axios.post(`/qa/questions/${qid}/answers`, {
        body: answerBody.value,
        name: nickname.value,
        email: email.value
      })
      .then(() => {
        console.log('Successfully posted answer')
      })
      .catch((err) => {
        console.log(err)
      })
      this.setState({open: false})
    } else {
      alert('Please make sure all fields have valid inputs.')
    }
  }

  render() {
    const overlay = { overlay: {
      backgroundColor: 'rgba(17, 17, 17, 0.75'
    }}
    return (
      <Fragment>
        <Modal
         ariaHideApp={false}
         isOpen={this.state.open}
         className='answerModal'
         style={overlay}
         overlayClassName={{
           base: 'answerModalOverlay',
           afterOpen: 'answerModalOverlay-in',
           beforeClose: 'answerModalOverlay-out'
         }}
         onRequestClose={this.submitForm || this.cancelForm}
        >
        <form>
          <div>
            <h2>Add an answer</h2>
            {/* {WILL NEED TO ADD THE QUESTION AND ITEM} */}
            <label>Answer *: </label>
            <textarea id='answerInputText' className='answerModalInput' name='answer' type='text' onChange={(e) => {this.charsLeft(e)}} maxLength='1000' required />
            <p id='charsLeft'>{this.state.chars} characters remaining</p>

            <label>Nickname *: </label>
            <input type="text" id="answerNickname" className='answerModalInput' name="nickname"
             placeholder='Example: jack543!' maxLength='60'  required></input>
             <p className='warning'>For privacy reasons, do not use your full name or email address</p><br></br>

            <label>Email *: </label>
            <input type="email" id="answerEmail" className='answerModalInput' name="email"
             placeholder='Example: jack@email.com' maxLength='60'  required></input>
             <p className='warning'>For authentication reasons, you will not be emailed</p><br></br>

            <p id='required'>* Required</p>

            <button onClick={(event) => this.submitForm(event)}>Submit</button>
            <button onClick={this.cancelForm}>Cancel</button>
          </div>
        </form>
        </Modal>
        <p id='addAnswerButton' onClick={this.openModal}>{' '}  Add Answer</p>
      </Fragment>

    )
  }
}

export default AddAnswer