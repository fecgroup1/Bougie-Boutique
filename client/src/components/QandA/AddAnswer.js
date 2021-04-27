import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeConsumer, styled } from 'styled-components'
import { ThemeToggle, QuestionsButtons, QAModalInput, CloseModalButton, Warning, Required, AddAnswerButton } from '../../Styles'
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
  const [currentPicture, setCurrentPicture] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setOpen(false)
    setChars(1000)
    setImages([])
    setCurrentPicture([])
  }, [props.currentProductId, props.product])

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

  const selectedPhoto = (image) => {
    setClicked(true)
    setCurrentPicture(image)
    document.body.style.overflow = 'hidden';
  };

  const changeClick = () => {
    setClicked(false)
    document.body.style.overflow = 'unset'
 }

  const charsLeft = (e) => {
    const remaining = 1000 - e.target.value.length;
    setChars(remaining);
  }

  const removePhoto = (e, index) => {
    e.preventDefault()
    images.splice(index, 1);
    setImages([...images])
  }

  const addPhotos = (e) => {
    setFailedPhotoUpload(false);
    setInvalidPhoto(false);
    setOverPhotoLimit(false);
    if (e.target.files.length + images.length > 5) {
      setOverPhotoLimit(true);
    } else {
      setImgToUpload(true);
      setImgUploading(true);
      const test = [...e.target.files].map((file) => {
        if (!file.name.match(/\.(jpg|jpeg|png)$/)) {
          e.target.value = null;
          setInvalidPhoto(true);
          setImgUploading(false);
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
          setImages([...images, ...urlArray])
          setImgUploading(false)
        })
        .catch((err) => {
          console.log(err)
          e.target.value = null;
          setFailedPhotoUpload(true)
          setImgUploading(false);
        })
    }
  }

  const submitForm = (event) => {
    event.preventDefault()
    setEmailInvalid(false)
    setNicknameInvalid(false)
    setTextBodyInvalid(false)
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

  if (props.product) {
    return (
      <Fragment>
        <ThemeConsumer>
          {theme =>
            <Modal
              ariaHideApp={false}
              isOpen={open}
              style={{
                overlay: {
                  background: 'rgba(17, 17, 17, 0.75)',
                  backdropFilter: 'blur(5px)'
                },
                content: {
                  position: 'absolute',
                  backgroundColor: theme.bg,
                  width: '25%',
                  minWidth: '300px',
                  height: '70%',
                  maxHeight: '80%',
                  minHeight: '500px',
                  margin: 'auto',
                  border: `10px solid ${theme.bluGry}`,
                  overflow: 'auto'
                }
                }}
              overlayClassName={{
                base: 'qaModalOverlay',
                afterOpen: 'qaModalOverlay-in',
                beforeClose: 'qaModalOverlay-out'
              }}
              onRequestClose={() => closeForm()}
            >
            <form noValidate="">
              <div>
              <CloseModalButton onClick={closeForm}>X</CloseModalButton>
                <h2>Add an answer</h2>
                <p style={{fontWeight: 'bold'}}>{props.product.name}: {props.question.question_body}</p>
                <label>* Your Answer: </label>
                {textBodyInvalid ? <Warning style={{color: 'red', marginBottom: '5px'}}>Please enter an answer</Warning> : null}
                <textarea name='answer' id='answerInputText' style={{width: '100%', height: '100px', backgroundColor: theme.bg, border: `2px solid ${theme.bluGry}`,
                 color: `${theme.text}`, fontFamily: "'Josefin Sans', sans-serif", padding: '5px'}}
                  type='text' onChange={(e) => {charsLeft(e)}} maxLength='1000' required />
                <p style={{fontSize: '14px', marginTop: '0', marginBottom: '30px'}}>{chars} characters remaining</p>


                <label>* What is your nickname? </label><br></br>
                {nicknameInvalid ? <Warning style={{color: 'red', marginBottom: '5px'}}>Please enter a valid name</Warning> : null}
                <QAModalInput type="text" id="answerNickname" name="nickname"
                  placeholder='Example: jack543!' maxLength='60'  required></QAModalInput>

                <Warning>For privacy reasons, do not use your full name or email address</Warning><br></br>

                <label>* Your email: </label><br></br>
                {emailInvalid ? <Warning style={{color: 'red', marginBottom: '5px'}}>Please enter a valid email</Warning> : null}
                <QAModalInput type="email" id="answerEmail" name="email"
                  placeholder='Example: jack@email.com' maxLength='60'  required></QAModalInput>
                <Warning className='warning'>For authentication reasons, you will not be emailed</Warning><br></br>

                <label> Photos: </label><br></br>
                <input type='file' style={{width: '60%'}} name='image' accept='image/png, image/jpeg' onChange={addPhotos} multiple/>
                {!overPhotoLimit ?
                  <Warning className='warning'>Choose up to 5 photos</Warning>
                  :
                  <Warning style={{color: 'red'}} className='warning'>Too many photos, try again!</Warning>
                }
                  {!imgToUpload ?
                  <Fragment>
                  <Required id='required'>* Required</Required>
                  <QuestionsButtons onClick={(event) => submitForm(event)}>Submit</QuestionsButtons>
                  </Fragment>
                  :
                  (
                <Fragment>
                <div>
                  {images.map((image, index) => (
                    <div key={index} style={{display: 'inline-block', position: 'relative'}}>
                      <i style={{zIndex: '5', position: 'absolute'}} onClick={(e) => removePhoto(e, index)} className="lni lni-cross-circle"></i>
                      <Modal
                      ariaHideApp={false}
                      isOpen={clicked}
                      onRequestClose={() => changeClick()}
                      className= 'qaImgModal'
                      style={{
                        overlay: {
                          background: 'rgba(17, 17, 17, 0.75)',
                          backdropFilter: 'blur(5px)',
                          zIndex: '5'
                        },
                        content: {
                          transform: 'translate(0, 5%)',
                          position: 'relative',
                          backgroundColor: 'rgba(17, 17, 17, 0.75)',
                          overflow: 'hidden',
                          width: '90%',
                          height: '90%',
                          margin: 'auto',
                          border: 'none',
                          zIndex: '5'
                        }
                        }}
                      >
                      <img style={{width: '100%', height: 'auto'}} src={currentPicture}/>
                      </Modal>
                      <img style={{position: 'relative', maxHeight: '75px', maxWidth: '75px', marginRight: '10px'}} src={image} onClick={() => {selectedPhoto(image)}}/>
                    </div>
                    ))}
                </div>
                <div>
                  {!imgUploading ?
                  (
                  <Fragment>
                  {invalidPhoto ? <Warning style={{color: 'red', marginBottom: '5px'}}>Invalid photo type included</Warning> : null}
                  {failedPhotoUpload ? <Warning style={{color: 'red', marginBottom: '5px'}}>One or more images failed to upload</Warning> : null}

                  {failedPhotoUpload || invalidPhoto || overPhotoLimit ? null : <p style={{fontSize: '14px', marginBottom: '-10px'}}>Successfully uploaded photos</p>}
                  <p id='required'>* Required</p>
                  <QuestionsButtons onClick={(event) => submitForm(event)}>Submit</QuestionsButtons>
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
          }
        </ThemeConsumer>
        <AddAnswerButton onClick={openModal}>{' '}  Add Answer</AddAnswerButton>
      </Fragment>
    )
  } else {
    return (<div></div>)
  }
}

export default AddAnswer