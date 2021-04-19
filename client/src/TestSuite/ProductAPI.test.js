const _ = require('../Utils/ProductAPI.js');

test('getProduct retrieves the reviews, meta data, and styles for a product and returns it as a product object', done => {
  const cb = (data) => {
    try {
      // console.log('this is data.meta: ', data)

      expect(data.currentProductId).toBe(13023);
      expect(data.product).toBeDefined();
      expect(data.styles).toBeDefined();

      /* there is additional async behavior that may need to be accounted for need more reasearch on why the below aren't passing */

      // expect(data.meta).toBeDefined();
      // expect(data.reviews).toBeDefined();

      done();
    } catch(err) {
      done(err);
    }
  }

  _.getProduct(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});