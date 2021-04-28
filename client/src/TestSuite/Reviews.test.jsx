import React from 'react'
import RatingsReviews from '../components/RatingsReviews/index.jsx'
import {render} from '@testing-library/react'
import {light} from '../Styles/themes.jsx'

var store ={};
store.setMeta = ()=>{}
store.setReviews = ()=>{}
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
          }
      },
      "averageRating": 3.9,
      "starRating": 4
  },
  "reviews": [
      {
          "rating": 5,
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
      }
  ],

}
test('<RatingsReviews/> renders without crashing', ()=>{
  var div = document.createElement('div')
  render(
    <RatingsReviews store = {store} theme={light} />, div
  )
});

test('reviews section matches snapshot', ()=>{
  var component = render(
    <RatingsReviews store = {store} theme={light} />
  )

  expect(component.container).toMatchSnapshot();
})


test('<RatingsReviews/> renders without crashing', ()=>{
  const div = document.createElement('div')
  const {getByTestId} = render(
    <RatingsReviews store = {store} theme={light} />, div
  )
  const content = getByTestId('rairings')

});


