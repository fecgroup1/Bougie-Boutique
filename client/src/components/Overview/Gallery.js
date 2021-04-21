import React from 'react';
import { Left } from './../../Styles';

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
      <Left>
        <div id="gallery" style={{height: '500px'}}>
          <img
            style={galImg}
            src={styles[currImg[0]].photos[currImg[1]].url}/>
        </div>
      </Left>
    );
  }
}

export default Gallery;