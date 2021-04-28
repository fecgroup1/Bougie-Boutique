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

  return (
    <div>
      {props.answer.photos.length > 0 ? (
        <div className='qaImages'>
          {props.answer.photos.map((image, index) => (
            <div key={index} className='qaPhotos' style={{display: 'inline'}}>
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
                      zIndex: '5',
                      justifyContent: 'center'
                    }
                  }}
              >
              <img key={index} style={{width: '100%', height: 'auto'}} src={getUrl(image)}/>
              </Modal>
            <img key={index} style={{padding: '5px', maxHeight: '100px', maxWidth: '100px', marginLeft: '21px', marginRight: '-20px'}}
              onClick={() => {selectedPhoto(image)}} className='img' src={image.url}/>
            </div>
          ))}
        </div>
      )
      : null}
    </div>
  )
}

export default AnswerPhotos