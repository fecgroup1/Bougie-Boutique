import ReviewAPI from '../Utils/ReviewAPI';
import axios from 'axios'

jest.mock('axios');

test('getReviews gets the reviews the current product and returns it as an array of objects', () => {
  var reviews= [
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
    },
    {
        "rating": 3,
        "date": "2021-03-08T00:00:00.000Z",
        "summary": "Nice combo",
        "body": "I like to combo this product with my monkey shoes for a +30 fashion and a bonus to my critical strike",
        "photos": [
            {
                "id": 496601,
                "url": "https://i.ibb.co/TBBWs1B/monkey-Shoes.jpg"
            }
        ],
        "recommended": true,
        "reviewerName": "MonkeyShoeMatt",
        "responseToReview": null,
        "helpfulness": 14
    }]

  const resp = {data: reviews};
  axios.get.mockResolvedValue(resp);

  return ReviewAPI.getReviews(13023)
    .then(res => expect(res.data).toEqual(reviews))
});

test('getMeta gets the Metadata for the current product and returns it ', () => {
    var meta= {
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
        }
    }

    const resp = {data: meta};
    axios.get.mockResolvedValue(resp);

    return ReviewAPI.getReviews(13023)
      .then(res => expect(res.data).toEqual(meta))
  });