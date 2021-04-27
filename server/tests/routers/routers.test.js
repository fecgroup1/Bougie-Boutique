const TOKEN = process.env.TOKEN
const request = require('supertest')
const app = require('../../index.js')

xdescribe('tests for routes', () => {
  xit('should get related products for a given product id', async (done) => {
    const res = await request(app)
      .get('/product/related/?pid=13030')
      .expect("Content-Type", /json/)
      .expect(200, done)
      .end(function(err, res) {
        if (err) throw err;
      })
  });
})
