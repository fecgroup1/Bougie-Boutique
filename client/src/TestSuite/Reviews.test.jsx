import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import RatingsReviews from '../components/RatingsReviews/index.jsx'
import Review from '../components/RatingsReviews/Review.jsx'
import {light} from '../Styles/themes.jsx'
import ReviewAPI from '../Utils/ReviewAPI';

jest.mock('axios');


var store = {}
store.setMeta = ReviewAPI.getMeta,
store.setReviews = ReviewAPI.getReviews,
store.state = {
  "currentProductId": "13023",
  "product": {
      "name": "Camo Onesie",
  },

  "meta": {
      "ratings": {
          "1": "3",
          "3": "4",
          "4": "5",
          "5": "11"
      },
      "recommended": {
          "false": "3",
          "true": "20"
      },
      "characteristics": {
          "Fit": {
              "id": 43617,
              "value": "3.9583333333333333"
          },
          "Length": {
            "id": 43618,
            "value": "3.9583333333333333"
        }
      },
      "averageRating": 3.9,
      "starRating": 4
  },
  "reviews": [
      {
          "rating": 5,
          "review_id": 1,
          "date": "2021-03-08T00:00:00.000Z",
          "summary": "Makes me smile",
          "body": "This product is great because it puts a little smile on my face!",
          "photos": [
              {
                  "id": 496602,
                  "url": "https://i.ibb.co/5xbC4Xk/happy-Monkey.jpg"
              }
          ],
          "recommended": true,
          "reviewerName": "SmilingSean",
          "responseToReview": null,
          "helpfulness": 42
      },
      {
        "rating": 5,
        "review_id": 2,
        "date": "2021-03-08T00:00:00.000Z",
        "summary": "times 2",
        "body": "This the second!",
        "photos": [
            {
                "id": 496602,
                "url": "https://i.ibb.co/5xbC4Xk/happy-Monkey.jpg"
            }
        ],
        "recommended": true,
        "reviewerName": "second",
        "responseToReview": null,
        "helpfulness": 42
    },
    {
      "rating": 5,
      "review_id": 3,
      "date": "2021-03-08T00:00:00.000Z",
      "summary": "times three",
      "body": "The third one",
      "photos": [
          {
              "id": 496602,
              "url": "https://i.ibb.co/5xbC4Xk/happy-Monkey.jpg"
          }
      ],
      "recommended": true,
      "reviewerName": "third",
      "responseToReview": null,
      "helpfulness": 42
  },
  ],

}
test('<RatingsReviews/> renders without crashing', ()=>{
  var div = document.createElement('div')
  axios.get.mockResolvedValue({productId: 13023})
  render(
    <RatingsReviews store = {store} theme={light} />, div
  )
  jest.resetAllMocks()
});

test('<RatingsReviews/> to get meta and reviews upon render', ()=>{
  var div = document.createElement('div')
  axios.get.mockResolvedValue({productId: 13023})
  render(
    <RatingsReviews store = {store} theme={light} />, div
  )

  expect(axios.get).toHaveBeenCalledTimes(2)
  expect(axios.get).toHaveBeenCalledWith('/reviews/meta?product_id=13023')
  expect(axios.get).toHaveBeenCalledWith('/reviews?product_id=13023')
  jest.resetAllMocks()
});

// test('reviews section matches snapshot', ()=>{
//   var component = render(
//     <RatingsReviews store = {store} theme={light} />
//   )

//   expect(component.container).toMatchSnapshot();
// })


test('<Review/> to render review body text as review', ()=>{
  const {getByTestId} = render(
    <Review review={store.state.reviews[0]} />
  )
  const reviewBody = getByTestId('reviewBody');
  expect(reviewBody.textContent).toBe("This product is great because it puts a little smile on my face!")
});

test('<Review/> to render review summary text as heading', ()=>{
  const {getByTestId} = render(
    <Review review={store.state.reviews[0]} />
  )
  const reviewSummary = getByTestId('reviewSummary');
  expect(reviewSummary.textContent).toBe("Makes me smile")
});

test('Review to call markHelpful if helpful is clicked', ()=>{
  const {getByTestId} = render(
    <Review review={store.state.reviews[0]} />
  )
  axios.put.mockResolvedValue({productId: 13023});
  const helpful = getByTestId('reviewHelpful');
  fireEvent.click(helpful)

  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenCalledWith('/reviews/1/helpful')
  jest.resetAllMocks()
});

test('Call Report if Report is clicked', ()=>{

  const {getByTestId} = render(
    <Review review={store.state.reviews[0]} />)
  axios.put.mockResolvedValue({productId: 13023});
  const report = getByTestId('reviewReport');
  fireEvent.click(report)

  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(axios.put).toHaveBeenCalledWith('/reviews/1/report')
  jest.resetAllMocks()

})

test('show more button adds more reviews', ()=>{
  const {getByTestId, getAllByTestId} = render(
    <RatingsReviews store = {store} theme={light} />
  )
  expect(getAllByTestId('reviewBody').length).toBe(2)

  const showMore = getByTestId('showMore');
  fireEvent.click(showMore)

  expect(getAllByTestId('reviewBody').length).toBe(3)

})


test('send review if submit review is clicked', ()=>{
  const {getByTestId, getByText} = render(
    <RatingsReviews store = {store} theme={light} />
  )
  axios.post.mockResolvedValue({productId: 13023});
  const newReviewButton =getByText('Add A Review');
  fireEvent.click(newReviewButton);
  const submit = getByTestId('submitReviewButton');
  fireEvent.click(submit)

  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenCalledWith('/reviews', expect.anything(), {"headers": {"Content-Type": "application/json"}})
  jest.resetAllMocks()

})

test('NewReviewModal should have name of product in Review About heading', ()=>{
  const {getByTestId, getByText} = render(
    <RatingsReviews store = {store} theme={light} />
  )
  var newReviewButton =getByText('Add A Review');
  fireEvent.click(newReviewButton);
  let reviewAbout = getByTestId('reviewAbout');
  expect(reviewAbout.textContent).toBe("About the Camo Onesie")
})



test('NewReviewModal should have label for each characteristics input', ()=>{
  const {getAllByTestId, getByText} = render(
    <RatingsReviews store = {store} theme={light} />
  )
  var newReviewButton =getByText('Add A Review');
  fireEvent.click(newReviewButton);
  const charLabels = getAllByTestId('charLabel');
  expect(charLabels[0].textContent).toBe("Fit:")
  expect(charLabels[1].textContent).toBe("Length:")
})

test('clicking add a review button should open new review modal', ()=>{
  const {getByTestId, getByText} = render(
    <RatingsReviews store = {store} theme={light} />
  )
  var newReviewButton =getByText('Add A Review');
  fireEvent.click(newReviewButton);

  expect(getByTestId('reviewAbout')).toBeInTheDocument()

})




