import React from 'react'
import axios from 'axios';
// import '@testing-library/jest-dom'
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent } from '@testing-library/react'
import Questions from '../components/QandA/Questions.js';

// const server = setupServer(
//   rest.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/qa/questions?product_id=13023&count=50,
//   (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({product_id: '13023'}));
//   })
// )

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

// it ('gets the questions for the correct product', async () => {
//   const questions = await
// })

it('renders correctly', () => {
  const {getByText} = render(<Questions productId={'13023'} name={'Camo Onesie'}/>)
  expect(getByText('Questions and Answers'))
})