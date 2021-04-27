const TOKEN = process.env.TOKEN
const request = require('supertest')
const app = require('../../index.js')

describe('tests for routes', () => {
  it('should get related products for a given product id', () => {
    request(app)
      .get('/product/related/?pid=13030')
      .expect("Content-Type", /json/)
      .expect(200)
      // console.log(res.body)
      .then((res) => {
        expect(res.body.currentProductId).toBe(13024)
      })
      .catch(err => err)
  });

  it('should get data from the API', () => {
    request(app)
      .get('/qa/questions?product_id=13023&count=50')
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.product_id).toBe("13023")
      })
      .catch(err => err)
  })


})
