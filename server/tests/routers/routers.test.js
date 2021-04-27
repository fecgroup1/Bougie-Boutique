const TOKEN = process.env.TOKEN
const request = require('supertest')
const app = require('../../index.js')

describe('tests for routes', () => {
  it('should get related products for a given product id', (done) => {
    request(app)
      .get('/product/related/?pid=13030')
      .expect("Content-Type", /json/)
      .expect(200, done)
      // expect(res.body.currentProductId).toBe(13024)
      // console.log(res.body)
      .end((err, res) => {
        if (err) return done(err)
        return done();
      })
      // .then((res) => {

      //   done();
      // })
      // .catch(err => done(err))
  });
})
