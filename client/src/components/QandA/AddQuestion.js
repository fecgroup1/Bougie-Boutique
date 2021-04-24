import React, {Fragment} from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Modal from 'react-modal'


//Will implement photos later

class AddQuestion extends React.Component {
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
    let questionBody = document.getElementById('questionInputText')
    let nickname = document.getElementById('questionNickname')
    let email = document.getElementById('questionEmail')

    if ((questionBody.validity.valid) && (nickname.validity.valid)
        && email.validity.valid) {
      const pid = Number(this.props.currentProductId);
      axios.post(`/qa/questions`, {
        body: questionBody.value,
        name: nickname.value,
        email: email.value,
        product_id: pid
      })
      .then(() => {
        console.log('Successfully posted question')
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
         className='questionModal'
         style={overlay}
         overlayClassName={{
           base: 'questionModalOverlay',
           afterOpen: 'questionModalOverlay-in',
           beforeClose: 'questionModalOverlay-out'
         }}
         onRequestClose={() => this.closeForm()}
        >
        <form>
          <div>
            <button id='closeModal' onClick={this.closeForm}>X</button>
            <h2>Ask your question</h2>
            <h4>About the Product</h4>
            <label>* Your Question: </label>
            <textarea id='questionInputText' name='question' type='text' onChange={(e) => {this.charsLeft(e)}} maxLength='1000' required />
            <p id='charsLeft'>{this.state.chars} characters remaining</p>

            <label>* What is your nickname? </label>
            <input type="text" id="questionNickname" className='modalInput'
             placeholder='Example: jackson11!' name="nickname" maxLength='60' required></input>
             <p className='warning'>For privacy reasons, do not use your full name or email address</p><br></br>

            <label>* Your email: </label>
            <input type="email" id="questionEmail" className='modalInput'
             placeholder='Why did you like the product or not?' name="email" maxLength='60' required></input>
             <p className='warning'>For authentication reasons, you will not be emailed</p><br></br>

            <p id='required'>* Required</p>

            <button id='qaSubmit' onClick={(event) => this.submitForm(event)}>Submit</button>
          </div>
        </form>
        </Modal>
        <button id='addQuestionButton' onClick={this.openModal}>ASK A QUESTION +</button>
      </Fragment>

    )
  }
}

export default AddQuestion