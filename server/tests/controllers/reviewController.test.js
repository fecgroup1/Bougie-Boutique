const _ = require('./../../controllers/Review.js');

test('getMeta gets ratings, recommended, characteristics, averageRating, and starRating ', done => {
  function cb(metaData) {
    try {
      expect(metaData.ratings).toBeDefined();
      expect(metaData.recommended).toBeDefined();
      expect(metaData.characteristics).toBeDefined();
      expect(metaData.averageRating).toBeLessThanOrEqual(5);
      expect(metaData.starRating).toBeLessThanOrEqual(5);
      expect(metaData.averageRating).toBeGreaterThanOrEqual(0);
      expect(metaData.starRating).toBeGreaterThanOrEqual(0);
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getMeta(13023)
  .then((metaData) => cb(metaData))
  .catch((err) => cb(err));
});

test('getReviews gets rating, date, summary, body, photos, reviewerName, responseToReview, and helpfulness ', done => {
  function cb(reviews) {
    try {
      expect(reviews[0].rating).toBeDefined();
      expect(reviews[0].date).toBeDefined();
      expect(reviews[0].summary).toBeDefined();
      expect(reviews[0].body).toBeDefined();
      expect(reviews[0].photos).toBeDefined();
      expect(reviews[0].reviewerName).toBeDefined();
      expect(reviews[0].responseToReview).toBeDefined();
      expect(reviews[0].helpfulness).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getReviews(13023)
  .then((reviews) => cb(reviews))
  .catch((err) => cb(err));
});

test('calculateAverage calulates the average rating ', () => {
  const ratings = {'1':'5', '5':'5'}
  expect(_.calculateAverage(ratings)).toBe(3);
});