import React from 'react';
import { OuterStars, InnerStars, Small } from './../../../Styles';

class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.rating !== nextProps.rating) {
      return true;
    }
    console.log('Overview stars did not rerender')
    return false;
  }

  scrollToReviews(event) {
    event.preventDefault();
    let element = document.getElementById('ratingsreviews');
    let body = document.body.getBoundingClientRect();
    let pos = element.getBoundingClientRect();
    window.scroll({
      top: pos.top - body.top - 5,
      left: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const rating = this.props.rating;
    const reviews = this.props.reviews;

    const inner = {
      width: `${(rating / 5 * 100) + 1}%`,
    };

    return (
      <div>
        <OuterStars>
          <InnerStars style={inner}/>
          </OuterStars>
        <Small style={{position: 'relative', top: '-3px'}}>
          &nbsp;&nbsp;<a
            href=""
            onClick={(event) => this.scrollToReviews(event)}>
              Read all {reviews} reviews
          </a>
        </Small>
      </div>
    )
  }
}

export default Stars;