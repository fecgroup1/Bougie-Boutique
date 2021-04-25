import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import WidgetContainer from '../../Styles'
import Modal from 'react-modal'

const AddAnswer = (props) => {
  const [failedPhotoUpload, setFailedPhotoUpload] = useState(false);
  const [invalidPhoto, setInvalidPhoto] = useState(false);
  const [overPhotoLimit, setOverPhotoLimit] = useState(false);
  const [textBodyInvalid, setTextBodyInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [nicknameInvalid, setNicknameInvalid] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgToUpload, setImgToUpload] = useState(false);
  const [open, setOpen] = useState(false);
  const [chars, setChars] = useState(1000);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setOpen(false)
    setChars(1000)
    setImages([])
  }, [props.currentProductId, props.name])

  const openModal = (event) => {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }

  const closeForm = () => {
    setOpen(false);
    setImgToUpload(false);
    document.body.style.overflow = 'unset';
    setEmailInvalid(false);
    setNicknameInvalid(false);
    setTextBodyInvalid(false);
    setInvalidPhoto(false);
    setFailedPhotoUpload(false);
  }

  const charsLeft = (e) => {
    const remaining = 1000 - e.target.value.length;
    setChars(remaining);
  }

  const addPhotos = (e) => {
    setFailedPhotoUpload(false);
    setInvalidPhoto(false);
    setOverPhotoLimit(false);
    if (e.target.files.length > 5) {
      setOverPhotoLimit(true);
      setImages([]);
      e.target.value = null
    } else {
      setImages([]);
      setImgToUpload(true);
      setImgUploading(true);
      const test = [...e.target.files].map((file) => {
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
          e.target.value = null;
          setInvalidPhoto(true);
          setImgUploading(false);
          setImgToUpload(false);
          return;
        }
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
          setImgUploading(false)
        })
        .catch((err) => {
          console.log(err)
          e.target.value = null;
          setFailedPhotoUpload(true)
          setImgUploading(false);
          setImgToUpload(false);
        })
    }
  }

  const submitForm = (event) => {
    setEmailInvalid(false)
    setNicknameInvalid(false)
    setTextBodyInvalid(false)
    let answerBody = document.getElementById('answerInputText')
    let nickname = document.getElementById('answerNickname')
    let email = document.getElementById('answerEmail')

    if ((answerBody.validity.valid) && (nickname.validity.valid)
        && email.validity.valid && !failedPhotoUpload) {
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
    }
    if (!answerBody.validity.valid) {
      setTextBodyInvalid(true)
    }
    if (!nickname.validity.valid) {
      setNicknameInvalid(true)
    }
    if (!email.validity.valid) {
      setEmailInvalid(true)
    }
      return;
  }

  const overlay = { overlay: {
    backgroundColor: 'rgba(17, 17, 17, 0.75)'
  }}

  if (props.name) {
    return (
      <Fragment>
        <Modal
          ariaHideApp={false}
          isOpen={open}
          className='qaModal'
          style={overlay}
          overlayClassName={{
            base: 'qaModalOverlay',
            afterOpen: 'qaModalOverlay-in',
            beforeClose: 'qaModalOverlay-out'
          }}
          onRequestClose={() => closeForm()}
        >
        <form>
          <div>
          <button id='closeModal' onClick={closeForm}>X</button>
            <h2>Add an answer</h2>
            <p styles={{fontWeight: 'bold'}}>{props.name}: {props.question.question_body}</p>
            <label>* Your Answer: </label>
            {textBodyInvalid ? <p style={{color: 'red'}} className='invalidWarning'>Please enter an answer</p> : null}
            <textarea id='answerInputText' name='answer' type='text' onChange={(e) => {charsLeft(e)}} maxLength='1000' required />
            <p id='charsLeft'>{chars} characters remaining</p>


            <label>* What is your nickname? </label><br></br>
            {nicknameInvalid ? <p style={{color: 'red'}} className='invalidWarning'>Please enter a valid name</p> : null}
            <input type="text" id="answerNickname" className='modalInput' name="nickname"
              placeholder='Example: jack543!' maxLength='60'  required></input>

            <p className='warning'>For privacy reasons, do not use your full name or email address</p><br></br>

            <label>* Your email: </label><br></br>
            {emailInvalid ? <p style={{color: 'red'}} className='invalidWarning'>Please enter a valid email</p> : null}
            <input type="email" id="answerEmail" className='modalInput' name="email"
              placeholder='Example: jack@email.com' maxLength='60'  required></input>
            <p className='warning'>For authentication reasons, you will not be emailed</p><br></br>

            <label> Photos: </label><br></br>
            <input type='file' id='qaPhotoUpload' name='image' accept='image/png, image/jpeg' onChange={addPhotos} multiple/>
            {!overPhotoLimit ?
              <p className='warning'>Choose up to 5 photos</p>
              :
              <p style={{color: 'red'}} className='warning'>Too many photos, try again!</p>
            }
            {invalidPhoto ? <p style={{color: 'red'}} className='invalidWarning'>Invalid photo type included</p> : null}
            {failedPhotoUpload ? <p style={{color: 'red'}} className='invalidWarning'>One or more images failed to upload</p> : null}

            {!imgToUpload ?
            <Fragment>
            <p id='required'>* Required</p>
            <button id='qaSubmit' onClick={(event) => submitForm(event)}>Submit</button>
            </Fragment>
            :
            (
            <Fragment>
            <div>
              {images.map((image, index) => (
                <img className='submitPreview' key={index} src={image}/>
                ))}
            </div>
            <div>
              {!imgUploading ?
              (
              <Fragment>
              <p id='uploading'>Successfully uploaded photos</p>
              <p id='required'>* Required</p>
              <button id='qaSubmit' onClick={(event) => submitForm(event)}>Submit</button>
              </Fragment>)
              :
              (<i className="lni lni-spiner-solid lni-is-spinning"
              style={{fontSize:'2em', marginTop:'5px'}}></i>)
                }
            </div>
            </Fragment>
            )
            }
          </div>
        </form>
        </Modal>
        <p id='addAnswerButton' onClick={openModal}>{' '}  Add Answer</p>
      </Fragment>
    )
  } else {
    return (<div></div>)
  }
}

export default AddAnswer