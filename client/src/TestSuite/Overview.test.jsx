import React, {Fragment} from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'

import Overview from './../components/Overview';
import dummyState from './../Utils/dummyState.json';

// MOCK FUNCTIONS
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
window.localStorage = localStorageMock;

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
global.ResizeObserver = ResizeObserverMock;

// MOCK SERVER
const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.data(dummyState));
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// TESTS
test('loads loading screen when there is no data', () => {
  // Mock CurrentProduct
  class EmptyStore extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentProductID: 13023,
      };
    }
    setProduct() {}
    changeImg() {}
    setCart() {}
    render() {
      return (
        <Fragment>
          {this.props.render(this)}
        </Fragment>
      )
    }
  }

  render(<EmptyStore
    render={ store =>
      (<Overview store={store}/>)
    }
  />);

  expect(screen.getAllByAltText(/is loading/i)[0]).toBeInTheDocument();
})