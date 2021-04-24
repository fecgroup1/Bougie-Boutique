import axios from 'axios';

const TrackingAPI = {
  sendTrackingData: (data) => {
    return axios.post('/tracking', data)
    .then((data) => data)
    .catch((err) => err)
  }
}

export default TrackingAPI;