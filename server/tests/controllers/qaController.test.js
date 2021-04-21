const _ = require('./../../controllers/QandA.js');

test('getQuestions retrieves body, asker name, helpfulness, and reported status', done => {
  function cb(data) {
    try {
      expect(data.questions.[0].question_body).toBeDefined();
      expect(data.questions.[0].asker_name).toBeDefined();
      expect(data.questions.[0].question_helpfulness).toBeDefined();
      expect(data.questions.[0].reported).toBe(false);
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
      expect(data.questions[0].answerArr[0].answer_id).toBeDefined();
      expect(data.questions[0].answerArr[0].body).toBeDefined();
      expect(data.questions[0].answerArr[0].answerer_name).toBeDefined();
      expect(data.questions[0].answerArr[0].helpfulness).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getQA(13023)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});