import React, {Fragment} from 'react';
import axios from 'axios';

import { render, fireEvent, waitForElementToBeRemoved, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'

import Overview from './../components/Overview';
import CurrentProduct from './../Utils/CurrentProduct';
import dummyState from './../Utils/dummyState.json';
import { ThemeProvider } from 'styled-components';
import { dark } from './../Styles';
import { scroll } from './../components/Overview/Gallery/GalleryThumbnails';

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

jest.mock('./../components/Overview/Gallery/GalleryThumbnails', () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>;
    },
  };
});

const imgClickMock = jest.fn();
const theme = dark;

jest.mock('axios');

// MOCK OVERVIEW
class EmptyStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: this.props.pid,
      cart: {},
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

const MockOverview = ({Component, pid}) => (
  <ThemeProvider theme={theme}>
  <Component
    pid={pid}
    render={ store =>
      (<Overview store={store}/>)}/>
  </ThemeProvider>
);

// TESTS
test('Overview loads loading imgs when there is no data', () => {

  render(<EmptyStore
    render={ store =>
      (<Overview store={store}/>)
    }
  />);

  expect(screen.getAllByAltText(/is loading/i)[0]).toBeInTheDocument();
});

import AddToCart from './../components/Overview/Styles/AddToCart';
const setCart = jest.fn();

test('Quantity dropdown is disabled by default', () => {
  render(<AddToCart
    title={dummyState.product.name}
    currStyle={1}
    styles={dummyState.styles}
    outOfStock={false}
    cart={{}}
    setCart={setCart}/>);

  expect(screen.getByDisplayValue(/^(?=.*qty)(?=.*--).*$/i)).toHaveAttribute('disabled');
});

test('Quantity dropdown defaults to 1 when a size is selected', () => {
  render(<AddToCart
    title={dummyState.product.name}
    currStyle={1}
    styles={dummyState.styles}
    outOfStock={false}
    cart={{}}
    setCart={setCart}/>);

  fireEvent.change(screen.getByDisplayValue(/size/i), {target: {value: 0}});

  expect(screen.getByDisplayValue(/^(?=.*qty)(?=.*1).*$/i)).toBeInTheDocument();
})

test('Add to Cart button asks user to select a size if no size is selected', () => {
  render(<AddToCart
    title={dummyState.product.name}
    currStyle={1}
    styles={dummyState.styles}
    outOfStock={false}
    cart={{}}
    setCart={setCart}/>);

  fireEvent.click(screen.getByText(/^(?=.*add)(?=.*cart).*$/i));

  expect(screen.getAllByText(/^(?=.*select)(?=.*size).*$/i).length).toBeGreaterThan(1);
})

import Thumbnails from './../components/Overview/Styles/Select/Thumbnails';

test('On click, call function to update current style', () => {
  const getImgRegex = (styleIndex) => {
    return new RegExp('^' + '(?=.*' + dummyState.styles[styleIndex].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
  }
  const mockChangeStyle = jest.fn();

  render(<Thumbnails
    title={dummyState.product.name}
    styles={dummyState.styles}
    currStyle={0}
    changeStyle={mockChangeStyle} />);

    fireEvent.click(screen.getByAltText(getImgRegex(3)));
  expect(mockChangeStyle.mock.calls.length).toBe(1);
});

describe('style thumbnails', () => {
  it('change the main gallery image when clicked', async () => {
    const res = {data: dummyState};
    axios.get.mockResolvedValue(res);

    const { rerender } = render(<MockOverview
      Component={CurrentProduct}
      pid="13023"/>);


    await waitForElementToBeRemoved(screen.getAllByAltText(/is loading/i));

      var currentStyleRegex = new RegExp('^' + '(?=.*selected)' + '(?=.*' + dummyState.styles[0].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
      expect(screen.getByAltText(currentStyleRegex)).toBeInTheDocument();

      var newCurrentStyleRegex = new RegExp('^' + '(?=.*selected)' + '(?=.*' + dummyState.styles[1].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');

      var newStyleRegex = new RegExp('^' + '(?=.*' + dummyState.styles[1].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
      fireEvent.click(screen.getByAltText(newStyleRegex));

      expect(screen.getByAltText(newCurrentStyleRegex)).toBeInTheDocument();
  });
});

    // describe('price display', () => {
    //   it('displays original price', () => {

    //   });
    //   it('displays sale price in red', () => {

    //   });
    //   it('displays original price with a strikethrough when there is a sale price', () => {

    //   });
    // });

    // describe('overlay thumbnails', () => {
    //   it('displays all images', () => {

    //   });
    //   it('scrolls the currently selected image into view') {

    //   };
    // });

    // describe('left/right gallery scroll buttons', () => {});
// });

// Gallery L/R Buttons
// QTY button is disabled until size is selected
// QTY button defaults to 1 when size is selected
// Add to Cart button is disabled until size is selected
// Add to Cart button throws an error when no size is selected
// Price is in red when sale product is selected