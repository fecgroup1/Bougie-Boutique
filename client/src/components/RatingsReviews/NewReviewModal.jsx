import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#app');

const NewReviewModal = ({close, isOpen, productName})=> {
  return(
     <Modal isOpen= {isOpen} onRequestClose= {()=> close()} style={{
    'overlay': {'background':'grey'},
    'content': {'color':'black' } }}>
    <span style={{'float': 'right', 'fontSize': '150%'}} onClick= {()=> close()}>&#10006;</span>
    <h2>Write Your Review</h2>
    <h4>About the {productName}</h4>
  </Modal>
  )
}

export default NewReviewModal;