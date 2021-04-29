import React from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'

import Overview from './../components/Overview';
import dummyState from './../Utils/dummyState.json';

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.data(dummyState));
  })
)

beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());



test('loads loading screen', async () => {

})