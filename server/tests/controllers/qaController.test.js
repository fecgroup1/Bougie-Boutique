const _ = require('./../../controllers/QandA.js');

test('getQuestions retrieves body, asker name, helpfulness, and reported status', done => {
  function cb(data) {
    try {
      expect(data[0].question_body).toBeDefined();
      expect(data[0].asker_name).toBeDefined();
      expect(data[0].question_helpfulness).toBeDefined();
      expect(data[0].reported).toBe(false);
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getQA(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});

test('getQuestions retrieves id, body, answerer name, helpfulness, and photo id/url', done => {
  function cb(data) {
    try {
      expect(data[2].answer_id).toBeDefined();
      expect(data[2].body).toBeDefined();
      expect(data[2].answerer_name).toBeDefined();
      expect(data[2].helpfulness).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getAnswers(66299)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});