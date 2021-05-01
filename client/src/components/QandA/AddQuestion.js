import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeToggle, QuestionsButtons, QAModalInput, CloseModalButton, Warning, Required } from '../../Styles'
import { ThemeConsumer, styled } from 'styled-components'
import Modal from 'react-modal'


const AddQuestion = (props) => {
  const [open, setOpen] = useState(false);
  const [chars, setChars] = useState(1000);
  const [textBodyInvalid, setTextBodyInvalid] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [nicknameInvalid, setNicknameInvalid] = useState(false);

  useEffect(() => {
    setOpen(false)
    setChars(1000)
  }, [props.currentProductId, props.product])

  const openModal = (event) => {
    setOpen(true)
    document.body.style.overflow = 'hidden';
  }

  const closeForm = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
    setEmailInvalid(false)
    setNicknameInvalid(false)
    setTextBodyInvalid(false)
  }

  const charsLeft = (e) => {
    const remaining = 1000 - e.target.value.length;
    setChars(remaining)
  }

  const submitForm = (event) => {
    event.preventDefault();
    setEmailInvalid(false)
    setNicknameInvalid(false)
    setTextBodyInvalid(false)
    let questionBody = document.getElementById('questionInputText')
    let nickname = document.getElementById('questionNickname')
    let email = document.getElementById('questionEmail')

    if ((questionBody.validity.valid) && (nickname.validity.valid)
        && email.validity.valid) {
      const pid = Number(props.currentProductId);
      axios.post(`/qa/questions`, {
        body: questionBody.value,
        name: nickname.value,
        email: email.value,
        product_id: pid
      })
      .then(() => {
        props.setNewQuestion(event)
      })
      .catch((err) => {
        console.log(err)
      })
      closeForm()
    }
    if (!questionBody.validity.valid) {
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
          { theme =>
              <Modal
                ariaHideApp={false}
                isOpen={open}
                style={{
                  overlay: {
                    backgroundColor: 'rgba(17, 17, 17, 0.75)',
                    backdropFilter: 'blur(5px)'
                  },
                  content: {
                    position: 'absolute',
                    backgroundColor: theme.bg,
                    width: '25%',
                    minWidth: '300px',
                    height: '60%',
                    minHeight: '500px',
                    margin: 'auto',
                    border: `10px solid ${theme.bluGry}`
                  }
                }}
                overlayClassName={{
                  base: 'qaModalOverlay',
                  afterOpen: 'qaModalOverlay-in',
                  beforeClose: 'qaModalOverlay-out'
                }}
                onRequestClose={() => closeForm()}
              >
              <form noValidate="" data-testid='questionModal'>
                <div>
                  <CloseModalButton type='button' data-testid='closeQuestionModal' onClick={closeForm}>X</CloseModalButton>
                  <h2 aria-label='askQuestion'>Ask your question</h2>
                  <h4>About the {props.product.name}</h4>
                  <label>* Your Question: </label>
                  {textBodyInvalid ? <Warning style={{color: 'red', marginBottom: '5px'}}>Please enter a question</Warning> : null}
                  <textarea id='questionInputText' data-testid='questionBodyText' style={{width: '100%', height: '100px', backgroundColor: theme.bg, border: `2px solid ${theme.bluGry}`,
                    color: `${theme.text}`, fontFamily: "'Josefin Sans', sans-serif", padding: '5px'}}
                    name='question' type='text' onChange={(e) => {charsLeft(e)}} maxLength='1000' required />
                  <p style={{fontSize: '14px', marginTop: '0', marginBottom: '30px'}}>{chars} characters remaining</p>

                  <label>* What is your nickname? </label><br></br>
                  {nicknameInvalid ? <Warning style={{color: 'red', marginBottom: '5px'}}>Please enter a valid name</Warning> : null}
                  <QAModalInput type="text" id="questionNickname" data-testid='questionBodyNickname'
                    placeholder='Example: jackson11!' name="nickname" maxLength='60' required></QAModalInput>
                    <Warning>For privacy reasons, do not use your full name or email address</Warning><br></br>

                  <label>* Your email: </label><br></br>
                  {emailInvalid ? <Warning style={{color: 'red', marginBottom: '5px'}}>Please enter a valid email</Warning> : null}
                  <QAModalInput type="email" id="questionEmail" data-testid='questionBodyEmail'
                    placeholder='Why did you like the product or not?' name="email" maxLength='60' required></QAModalInput>
                    <Warning>For authentication reasons, you will not be emailed</Warning>

                  <Required id='required'>* Required</Required>

                  <QuestionsButtons data-testid='submitQuestionModal' onClick={(event) => submitForm(event)}>Submit</QuestionsButtons>
                </div>
              </form>
              </Modal>
          }
        </ThemeConsumer>
        <QuestionsButtons data-testid='addQuestion' onClick={openModal}>ASK A QUESTION +</QuestionsButtons>
      </Fragment>
    )
  } else {
    return (<div>Waiting For Product</div>)
  }
}

export default AddQuestion