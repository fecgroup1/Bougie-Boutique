import React from 'react'
import TrackingAPI from '../Utils/TrackingAPI';
import axios from 'axios';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// class App extends React.Component {

//   constructor (props) {
//     super(props);

//     this.state = {
//       dark: false,
//       outfits: [],
//     }
//     this.toggleTheme = this.toggleTheme.bind(this)
//   }

//   componentDidMount() {
//     document.body.addEventListener('click', this.handleTracking)
//   }

//   handleTracking(event) {
//     let timeStamp = new Date();
//     let data = {}
//     for (let i = 0; i < event.path.length; i++) {
//       if(event.path[i]) {
//         if (event.path[i].attributes) {
//           let code = event.path[i].attributes.getNamedItem('tracking');
//           if (code) {
//             data = code.value ? {element: event.target.outerHTML, widget: code.value, time: timeStamp } : {};
//             i = event.path.length;
//             console.log('tracking data', data)
//           }
//         }
//       }
//     }
//     if (data.widget) {

//     }

//   }

//   render() {

//     return (
//       <div id="content">
//         <section tracking="Overview">
//           <div>Overview</div>
//         </section>
//         <section tracking="Related Products">
//           <div>RelatedProducts</div>
//         </section>
//         <section tracking='Questions and Answers'>
//           <div>QandA</div>
//         </section>
//       </div>
//         )
//   }
// }

jest.mock('axios');

test('Post click tracking to interactions API',
() => {
  const click = { elemnt: '<h1> Hola Mundo </h1', time: '12th of never', widget: 'test land'}

  const resp = {status: 200}
   axios.post.mockResolvedValue(resp);

   return TrackingAPI.sendTrackingData(click)
   .then(data => expect(data.status).toEqual(200))
});

// test('test that click tracking registers on screen ', () => {
//   render(<App />)
//   return true
//   // userEvent.click(screen.getByText('Outfits'))
// })




