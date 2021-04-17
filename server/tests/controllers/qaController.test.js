const _ = require('./../../controllers/QandA.js');

test('getQuestions retrieves body, asker name, helpfulness, and reported status', done => {
  function cb(data) {
    try {
      expect(data[0].question_body).toBe('What fabric is the top made of?');
      expect(data[0].asker_name).toBe('yankeelover');
      expect(data[0].question_helpfulness).toBe(3);
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
      expect(data[2].answer_id).toBe(630244);
      expect(data[2].body).toBe('Something pretty soft but I can\'t be sure');
      expect(data[2].answerer_name).toBe('metslover');
      expect(data[2].helpfulness).toBe(5);
      expect(data[2].photos[0].id).toBe(529294);
      expect(data[2].photos[0].url).toBe('https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80');
      done();
    } catch (err) {
      done(err);
    }
  }

  _.getAnswers(66299)
  .then((data) => cb(data))
  .catch((err) => cb(err));
});