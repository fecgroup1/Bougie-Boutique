import React from 'react'
import Modal from 'react-modal'

class AnswerPhotos extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPicture: [],
      clicked: false,
    }
    this.selectedPhoto = this.selectedPhoto.bind(this)
    this.current = this.current.bind(this)
    this.changeClick = this.changeClick.bind(this)
  }

  selectedPhoto (image) {
    if (this.state.clicked === false) {
      this.setState({currentPicture: image, clicked: true});
    } else if (this.state.clicked === true) {
      this.setState({currentPicture: image, clicked: false});
    }
  };

  current () {
    return this.state.currentPicture.url;
  }

  changeClick () {
    if (this.state.clicked === true) {
      this.setState({clicked: false})
    }
  }

  render () {
    return (
      <div>
        {this.props.answer.photos.length > 0 ? (
          <div className='images'>
            {this.props.answer.photos.map((image, index) => (
              <div key={index} className='photos'>
                <Modal
                  ariaHideApp={false}
                  isOpen={this.state.clicked}
                  onRequestClose={() => this.changeClick}
                  className= 'answerModal'
                >
                <button onClick={this.changeClick}>X</button>
                <img key={index} className='enlargedImage' src={this.current(image)}/>
                </Modal>
              <img key={index} onClick={() => {this.selectedPhoto(image)}} className='img' src={image.url}/>
              </div>
            ))}
          </div>
        )
        : null}
      </div>
    )
  }
}

export default AnswerPhotos