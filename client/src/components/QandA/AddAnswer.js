import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Modal from 'react-modal'


//Will implement photos later

const AddAnswer = (props) => {
  const [open, setOpen] = useState(false);
  const [chars, setChars] = useState(1000);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setOpen(false)
    setChars(1000)
    setImages([])
  }, [props.currentProductId])

  const openModal = (event) => {
    event.preventDefault()
    setOpen(true)
    document.body.style.overflow = 'hidden';
  }

  const closeForm = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  const charsLeft = (e) => {
    const remaining = 1000 - e.target.value.length;
    setChars(remaining)
  }

  const addPhotos = (e) => {
    setImages([])
    const test = [...e.target.files].map((file) => {
      const bodyFormData = new FormData();
      bodyFormData.append('image', file);
      const options = {
          'Content-Type': 'multipart/form-data'
      }
      return axios.post('/addPhoto', bodyFormData, options)
    })
    Promise.all(test)
      .then((data) => {
        const urlArray = [];
        data.map((url) => {
          urlArray.push(url.data)
        })
        setImages(urlArray)
      })
  }

  const submitForm = (event) => {
    event.preventDefault();
    let answerBody = document.getElementById('answerInputText')
    let nickname = document.getElementById('answerNickname')
    let email = document.getElementById('answerEmail')

    if ((answerBody.validity.valid) && (nickname.validity.valid)
        && email.validity.valid) {
      const qid = props.question.question_id;
      axios.post(`/qa/questions/${qid}/answers`, {
        body: answerBody.value,
        name: nickname.value,
        email: email.value,
        photos: images
      })
      .then(() => {
        props.setNewAnswer(event)
      })
      .catch((err) => {
        console.log(err)
      })
      closeForm()
    } else {
      return;
    }
  }

  const overlay = { overlay: {
    backgroundColor: 'rgba(17, 17, 17, 0.75)'
  }}

  return (
    <Fragment>
      <Modal
        ariaHideApp={false}
        isOpen={open}
        className='answerModal'
        style={overlay}
        overlayClassName={{
          base: 'answerModalOverlay',
          afterOpen: 'answerModalOverlay-in',
          beforeClose: 'answerModalOverlay-out'
        }}
        onRequestClose={() => closeForm()}
      >
      <form>
        <div>
        <button id='closeModal' onClick={closeForm}>X</button>
          <h2>Add an answer</h2>
          <p styles={{fontWeight: 'bold'}}>Product: {props.question.question_body}</p>
          <label>* Your Answer: </label>
          <textarea id='answerInputText' name='answer' type='text' onChange={(e) => {charsLeft(e)}} maxLength='1000' required />
          <p id='charsLeft'>{chars} characters remaining</p>

          <label>* What is your nickname? </label>
          <input type="text" id="answerNickname" className='modalInput' name="nickname"
            placeholder='Example: jack543!' maxLength='60'  required></input>
            <p className='warning'>For privacy reasons, do not use your full name or email address</p><br></br>

          <label>* Your email: </label>
          <input type="email" id="answerEmail" className='modalInput' name="email"
            placeholder='Example: jack@email.com' maxLength='60'  required></input>
            <p className='warning'>For authentication reasons, you will not be emailed</p><br></br>

          <label> Photos: </label>
          <input type='file' id='qaPhotoUpload' name='image' accept='image/png, image/jpeg' onChange={addPhotos} multiple/>

          <p id='required'>* Required</p>

          <button id='qaSubmit' onClick={(event) => submitForm(event)}>Submit</button>
        </div>
      </form>
      </Modal>
      <p id='addAnswerButton' onClick={openModal}>{' '}  Add Answer</p>
    </Fragment>

  )
}

export default AddAnswer