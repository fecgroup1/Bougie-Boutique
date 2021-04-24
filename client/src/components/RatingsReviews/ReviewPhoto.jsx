import React, {useState} from 'react';
import Modal from 'react-modal';


const ReviewPhoto =({ photo })=> {
const[modalOpen, setModalOpen]= useState(false)

  return(
    <div>
      <img onClick={()=> setModalOpen(true)} style={{width:'65px'}} src={photo.url}></img>
      <Modal
        isOpen= {modalOpen}
        onRequestClose= {()=> setModalOpen(false)}
        style={{
          overlay: {background:'grey'},
          content: {width:'50%', margin:'auto'}}}>
        <img style={{width:'100%'}} src={photo.url}></img>
    </Modal>
    </div>
  )
};

export default ReviewPhoto;


