import TrackingAPI from '../Utils/TrackingAPI';
import axios from 'axios';

jest.mock('axios');

test('Post click tracking to interactions API',
() => {
  const click = { elemnt: '<h1> Hola Mundo </h1', time: '12th of never', widget: 'test land'}

  const resp = {status: 200}
   axios.post.mockResolvedValue(resp);

   return TrackingAPI.sendTrackingData(click)
   .then(data => expect(data.status).toEqual(200))
}
)