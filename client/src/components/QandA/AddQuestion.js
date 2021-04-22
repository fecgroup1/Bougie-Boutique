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
    let questionBody = document.getElementById('questionInputText')
    let nickname = document.getElementById('questionNickname')
    let email = document.getElementById('questionEmail')

    if ((questionBody.validity.valid) && (nickname.validity.valid)
        && email.validity.valid) {
      const qid = this.props.question.question_id;
      axios.post(`/qa/questions`, {
        body: questionBody.value,
        name: nickname.value,
        email: email.value,
        product_id: props.product.id
      })
      .then(() => {
        console.log('Successfully posted question')
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
    console.log(this.props.name)
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
         onRequestClose={this.submitForm || this.cancelForm}
        >
        <form>
          <div>
            <h2>Ask your question</h2>
            <h4>About the {this.props.name}</h4>
            <label>Your Question *: </label>
            <textarea id='questionInputText' className='questionModalInput' name='question' type='text' onChange={(e) => {this.charsLeft(e)}} maxLength='1000' required />
            <p id='charsLeft'>{this.state.chars} characters remaining</p>

            <label>Nickname *: </label>
            <input type="text" id="questionNickname" className='questionModalInput'
             placeholder='Example: jackson11!' name="nickname" maxLength='60' required></input>
             <p className='warning'>For privacy reasons, do not use your full name or email address</p><br></br>

            <label>Email *: </label>
            <input type="email" id="questionEmail" className='questionModalInput'
             placeholder='Why did you like the product or not?' name="email" maxLength='60' required></input>
             <p className='warning'>For authentication reasons, you will not be emailed</p><br></br>

            <p id='required'>* Required</p>

            <button onClick={(event) => this.submitForm(event)}>Submit</button>
            <button onClick={this.cancelForm}>Cancel</button>
          </div>
        </form>
        </Modal>
        <button id='addQuestionButton' onClick={this.openModal}>ASK A QUESTION</button>
      </Fragment>

    )
  }
}

export default AddQuestion