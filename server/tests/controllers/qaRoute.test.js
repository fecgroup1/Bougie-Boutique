const TOKEN = require('../../../config.js')
const request = require('supertest')
const app = require('../../index.js').listen()

describe('Get API Endpoints', () => {
  it('should get data from the API', async () => {
    const res = await request(app)
      .get('/qa/questions?product_id=13023&count=50')
      .expect("Content-Type", /json/)
      .expect(200)
      expect(res.body.product_id).toBe("13023")
  })
})

describe('Post in API Endpoints', () => {
  it('should post data to the API', async () => {
    const res = await request(app)
      .post("/qa/questions")
      .send({"body": "This is a test question",
            "name": "Test name",
            "email": "test@email.com",
            "product_id": 13023})
      .set('Accept', 'application/json')
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200)
      expect(res.text).toBe("Created")
  })
})

// describe('Put in API Endpoints', () => {
//   it('should Put data to the API', async () => {
//     const res = await request(app)
//       .put("/qa/questions/66299/helpful", null)
//       .expect(200)
//   })
// })