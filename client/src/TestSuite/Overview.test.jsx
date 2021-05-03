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

describe('Overview', () => {
  const getStyleRegex = (styleIndex) => {
    return new RegExp('^' + '(?=.*' + dummyState.styles[styleIndex].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
  }
  const getCurrStyleRegex = (styleIndex) => {
    return new RegExp('^' + '(?=.*selected)' + '(?=.*' + dummyState.styles[styleIndex].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i')
  }
  const getImgRegex = (style, photo) => {
    return new RegExp('^' + '(?=.*' + photo + ')'+ '(?=.*' + dummyState.styles[style].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
  }

  beforeAll(() => {
    const res = {data: dummyState};
    axios.get.mockResolvedValue(res);
  });

  beforeEach(() => {
    render(<MockOverview
      Component={CurrentProduct}
      pid="13023"/>);
  })

  it('main image changes when a style thumbnail is clicked', async () => {
    // await waitForElementToBeRemoved(screen.getAllByAltText(/is loading/i));

    var currentStyleRegex = getCurrStyleRegex(0);
    var origStyleElement = screen.queryAllByAltText(currentStyleRegex);
    expect(origStyleElement.length).toBeGreaterThan(0);

    var newStyleRegex = getStyleRegex(1);
    var newStyleElement = screen.queryAllByAltText(newStyleRegex);
    fireEvent.click(newStyleElement[0]);

    var newCurrentStyleRegex = getCurrStyleRegex(1);
    var newCurrStyleElement = screen.queryAllByAltText(newCurrentStyleRegex);
    expect(newCurrStyleElement.length).toBeGreaterThan(0);

    var origStyleElement2 = screen.queryAllByAltText(currentStyleRegex);
    expect(origStyleElement2.length).toBe(0);
  });

  it('displays the price in red and the original price with a strikethough when there is a sale', () => {
    var origPriceElement = screen.getByText(/.*140.*/);
    expect(origPriceElement).not.toHaveStyle('text-decoration: strikethrough');

    var saleStyleRegex = getStyleRegex(2)
    fireEvent.click(screen.getByAltText(saleStyleRegex));

    var salePriceElement = screen.getByText(/.*100.*/);
    expect(salePriceElement).toHaveStyle('color: red');

    var newOrigPriceElement = screen.getByText(/.*140\.00.*/);
    expect(newOrigPriceElement).toHaveStyle('text-decoration: line-through');
  });

  it('quantity dropdown is disabled by default', () => {

    expect(screen.getByDisplayValue(/^(?=.*qty)(?=.*--).*$/i)).toHaveAttribute('disabled');
  });

  it('quantity dropdown defaults to 1 when a size is selected', () => {

    fireEvent.change(screen.getByDisplayValue(/size/i), {target: {value: 0}});

    expect(screen.getByDisplayValue(/^(?=.*qty)(?=.*1).*$/i)).toBeInTheDocument();
  })

  it('Add To Cart button asks user to select a size if no size is selected', () => {

    fireEvent.click(screen.getByText(/^(?=.*add)(?=.*cart).*$/i));

    expect(screen.getAllByText(/^(?=.*select)(?=.*size).*$/i).length).toBeGreaterThan(1);
  });

  it('adds items to local storage when a size is selected and Add To Cart is clicked', () => {

    const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

    fireEvent.change(screen.getByDisplayValue(/size/i), {target: {value: 0}});

    fireEvent.click(screen.getByText(/^(?=.*add)(?=.*cart).*$/i));

    expect(localStorageSpy).toHaveBeenCalled();
  })

  it('switches to the next image when the next image button is clicked', () => {
    var nextButton = screen.getByLabelText(/^.*next.*$/i);

    var image0 = getImgRegex(0, 0);
    expect(screen.getByAltText(image0)).toBeInTheDocument;

    fireEvent.click(nextButton);

    var image1 = getImgRegex(0, 1);
    expect(screen.getByAltText(image1)).toBeInTheDocument;
    expect(screen.queryByAltText(image0)).toBe(null);
  });

  it('switches to the previous image when the previous image button is clicked', () => {
    var nextButton = screen.getByLabelText(/^.*next.*$/i);

    fireEvent.click(nextButton);

    var image1 = getImgRegex(0, 1);
    expect(screen.getByAltText(image1)).toBeInTheDocument;
    expect(screen.queryByAltText(image0)).toBe(null);

    var prevButton = screen.getByLabelText(/^.*previous.*$/i);

    fireEvent.click(prevButton);
    expect(screen.getByAltText(image0)).toBeInTheDocument;
    expect(screen.queryByAltText(image1)).toBe(null);
  });

  it('switches to the next style when the next button switches to an image of the next style', () => {
    var nextButton = screen.getByLabelText(/^.*next.*$/i);

    var style0 = getCurrStyleRegex(0);
    expect(screen.queryByAltText(style0)).toBeInTheDocument();

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    var style1 = getCurrStyleRegex(1);
    expect(screen.queryByAltText(style1)).toBeInTheDocument();
    expect(screen.queryByAltText(style0)).toBe(null);
  })

  it('switches to the previous style when the previous button switches to an image of the previous style', () => {

    var style3 = getStyleRegex(3);
    fireEvent.click(screen.queryByAltText(style3));

    var prevButton = screen.getByLabelText(/^.*previous.*$/i);
    fireEvent.click(prevButton);

    var style2 = getCurrStyleRegex(2);
    expect(screen.queryByAltText(style2)).toBeInTheDocument();

    var style0 = getCurrStyleRegex(0);
    expect(screen.queryByAltText(style0)).toBe(null);
  })
});