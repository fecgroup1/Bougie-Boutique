import React from 'react';

class Gallery extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const styles = this.props.styles;
    const currImg = this.props.currImg;
    const galImg = {
      objectFit: 'cover',
      objectPosition: '50% 50%',
      width: '100%',
      height: '100%'
    };

    return (
      <div id="gallery" className="left">
        <img
          style={galImg}
          src={styles[currImg[0]].photos[currImg[1]].url}/>
      </div>
    );
  }
}

export default Gallery;