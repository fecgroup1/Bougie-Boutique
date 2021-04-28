import React from 'react';
import { OuterStars, InnerStars, Small } from './../../../Styles';

class Stars extends React.Component {
  constructor(props) {
    super(props);
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
      width: `${(rating / 5 * 100)}%`,
    };

    return (
      <div style={{
        flexGrow: 0
      }}>
        <OuterStars>
          <i class="lni lni-star"></i>
          <i class="lni lni-star"></i>
          <i class="lni lni-star"></i>
          <i class="lni lni-star"></i>
          <i class="lni lni-star"></i>
          <InnerStars style={inner}>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
          </InnerStars>
          </OuterStars>
        <Small style={{position: 'relative', top: '-3px'}}>
          &nbsp;&nbsp;<a
            href="#ratingsreviews"
            onClick={(event) => this.scrollToReviews(event)}>
              Read all {reviews} reviews
          </a>
        </Small>
      </div>
    )
  }
}

export default Stars;