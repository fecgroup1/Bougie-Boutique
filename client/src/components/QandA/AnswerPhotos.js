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
    this.setState({clicked: false})
  }

  render () {
    const overlay = { overlay: {
      backgroundColor: 'rgba(17, 17, 17, 0.75'
    }}
    return (
      <div>
        {this.props.answer.photos.length > 0 ? (
          <div className='qaImages'>
            {this.props.answer.photos.map((image, index) => (
              <div key={index} className='qaPhotos'>
                <Modal
                  ariaHideApp={false}
                  isOpen={this.state.clicked}
                  onRequestClose={() => this.changeClick()}
                  className= 'qaImgModal'
                  style={overlay}
                >
                <button id='closeQAImg' onClick={this.changeClick}>X</button>
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