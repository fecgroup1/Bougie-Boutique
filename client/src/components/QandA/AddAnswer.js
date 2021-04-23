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
    this.closeForm = this.closeForm.bind(this)
    this.charsLeft = this.charsLeft.bind(this)
  }

  openModal(event) {
    event.preventDefault()
    this.setState({open: true})
    document.body.style.overflow = 'hidden';
  }

  closeForm() {
    this.setState({open: false})
    document.body.style.overflow = 'unset'
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
      this.closeForm()
    } else {
      return;
    }
  }

  render() {
    const overlay = { overlay: {
      backgroundColor: 'rgba(17, 17, 17, 0.75)'
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
         onRequestClose={() => this.closeForm()}
        >
        <form>
          <div>
          <button id='closeModal' onClick={this.closeForm}>X</button>
            <h2>Add an answer</h2>
            <p styles={{fontWeight: 'bold'}}>{this.props.name} : {this.props.question.question_body}</p>
            <label>Answer *: </label>
            <textarea id='answerInputText' name='answer' type='text' onChange={(e) => {this.charsLeft(e)}} maxLength='1000' required />
            <p id='charsLeft'>{this.state.chars} characters remaining</p>

            <label>Nickname *: </label>
            <input type="text" id="answerNickname" className='modalInput' name="nickname"
             placeholder='Example: jack543!' maxLength='60'  required></input>
             <p className='warning'>For privacy reasons, do not use your full name or email address</p><br></br>

            <label>Email *: </label>
            <input type="email" id="answerEmail" className='modalInput' name="email"
             placeholder='Example: jack@email.com' maxLength='60'  required></input>
             <p className='warning'>For authentication reasons, you will not be emailed</p><br></br>

            <p id='required'>* Required</p>

            <button id='qaSubmit' onClick={(event) => this.submitForm(event)}>Submit</button>
          </div>
        </form>
        </Modal>
        <p id='addAnswerButton' onClick={this.openModal}>{' '}  Add Answer</p>
      </Fragment>

    )
  }
}

export default AddAnswer