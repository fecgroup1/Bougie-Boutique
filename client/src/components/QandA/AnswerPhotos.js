import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'


const AnswerPhotos = (props) => {
  const [currentPicture, setCurrentPicture] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setCurrentPicture([])
    setClicked(false)
  }, [props.answer])

  const selectedPhoto = (image) => {
    if (clicked === false) {
      setClicked(true)
      setCurrentPicture(image)
      document.body.style.overflow = 'hidden';
    } else if (clicked === true) {
      setClicked(false)
      document.body.style.overflow = 'unset'
    }
  };

  const getUrl = () => currentPicture.url;


  const changeClick = () => {
     setClicked(false)
     document.body.style.overflow = 'unset'
  }

  const overlay = { overlay: {
    backgroundColor: 'rgba(17, 17, 17, 0.75'
  }}

  return (
    <div>
      {props.answer.photos.length > 0 ? (
        <div className='qaImages'>
          {props.answer.photos.map((image, index) => (
            <div key={index} className='qaPhotos'>
              <Modal
                ariaHideApp={false}
                isOpen={clicked}
                onRequestClose={() => changeClick()}
                className= 'qaImgModal'
                style={overlay}
              >
              <img key={index} className='enlargedImage' src={getUrl(image)}/>
              </Modal>
            <img key={index} onClick={() => {selectedPhoto(image)}} className='img' src={image.url}/>
            </div>
          ))}
        </div>
      )
      : null}
    </div>
  )
}

export default AnswerPhotos