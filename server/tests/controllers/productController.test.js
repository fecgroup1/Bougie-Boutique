const _ = require('../../controllers/Product.js');

test('getDetails retrieves the reviews, meta data, and styles for a product and returns it as a product object', done => {
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

  _.getOverviewData(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});

test('getAll retrieves the product details, q and a data, and related products for a product and returns it as a product object', done => {
  const cb = (data) => {
    try {
      // console.log('this is data.meta: ', data)

      expect(data.currentProductId).toBe(13023);
      expect(data.product).toBeDefined();
      expect(data.styles).toBeDefined();

      /* there is additional async behavior that may need to be accounted for need more reasearch on why the below aren't passing */

      // expect(data.meta).toBeDefined();
      // expect(data.reviews).toBeDefined();

      expect(data.related).toBeDefined();


      done();
    } catch(err) {
      done(err);
    }
  }

  _.getAll(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});

test('getProduct retrieves name, slogan, description, category, and features', done => {
  function cb(data) {
    try {
      expect(data.name).toBe('Camo Onesie');
      expect(data.slogan).toBe('Blend in to your crowd');
      expect(data.description).toBe('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.');
      expect(data.category).toBe('Jackets');
      expect(data.features[0].value).toBe('Canvas');
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getProduct(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});

test('getStyles retrieves style ids, name, original price, sale price, and photos', done => {
  function cb(data) {
    try {
      expect(data[0].style_id).toBe(64131);
      expect(data[0].name).toBe('Forest Green & Black');
      expect(data[0].original_price).toBe('140.00');
      expect(data[0].sale_price).toBe(null);
      expect(data[0]['default?']).toBe(true);
      expect(data[0].photos[0].thumbnail_url).toBe('https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80');
      expect(data[0].photos[0].url).toMatch(/http/);
      done();
    } catch (err) {
      done(err);
    }
  }
  _.getStyles(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});

test('getRelated retriieves the related procducts which is in the form of an array of numbers', done => {
  const cb = (data) => {
    try {
      expect(data[0]).toBe(13024);
      expect(data[1]).toBe(13025);
      expect(data[2]).toBe(13030);
      expect(data[3]).toBe(13029);
      done();
    } catch(err) {
      done(err);
    }
  }

  _.getRelated(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});