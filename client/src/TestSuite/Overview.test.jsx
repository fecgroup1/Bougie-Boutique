import React, {Fragment} from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'

import Overview from './../components/Overview';
import CurrentProduct from './../Utils/CurrentProduct';
import dummyState from './../Utils/dummyState.json';
import { ThemeProvider, ThemeConsumer } from 'styled-components';
import { dark } from './../Styles';

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

  const mockSizeSelect = AddToCart.handleSizeSelect
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

  fireEvent.click(screen.getByDisplayValue(/^(?=.*add)(?=.*cart).*$/i));

  expect(screen.getAllByText(/^(?=.*select)(?=.*size).*$/i).length).toBeGreaterThan(1);
})

import Thumbnails from './../components/Overview/Styles/Aelect/Thumbnails';

test('On click, a new style is featured', () => {

});

// import DefaultView from './../components/Overview/Gallery/DefaultView';
// import ExpandedView from './../components/Overview/Gallery/ExpandedView.js';

// describe('Gallery', () => {
//   const getRegex = (currStyle, currIndex) => {
//     return new RegExp('^' + '(?=.*' + currIndex + ')' + '(?=.*' + dummyState.styles[currStyle].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
//   }

//   it('changes it\'s image', () => {
//     // MOCKS
//     // jest.mock('./../components/Overview/Gallery/ExpandedView.js', () => {});
//     const imgClickMock = jest.fn();
//     const theme = dark;

//     var { rerender } = render(
//       <ThemeProvider theme={theme}>
//         <DefaultView
//           title={dummyState.product.name}
//           styles={dummyState.styles}
//           currImg={[0,0]}
//           lastImgIndex={5}
//           lastStyleIndex={5}
//           currLastIndex={5}
//           prevLastIndex={0}
//           handleImgClick={imgClickMock}
//           galLeft={0}
//           galTop={0}
//           galHeight={400}
//           galWidth={400}
//           buttonHeight={30}
//           buttonWidth={60}
//           numImgs={36}
//           currIndex={1}/>
//       </ThemeProvider>
//     )
//     var currImgRegex = getRegex(0, 0);
//     // expect(screen.getAllByAltText(currImgRegex).length).toBeGreaterThan(1);
//     expect(screen.getByAltText(/.*camo onesie.*/i)).toBeInTheDocument();

//     rerender(<DefaultView
//       title={dummyState.product.name}
//       styles={dummyState.styles}
//       currImg={[1,0]}
//       lastImgIndex={5}
//       lastStyleIndex={5}
//       currLastIndex={5}
//       prevLastIndex={5}
//       handleImgClick={imgClickMock}
//       galLeft={0}
//       galTop={0}
//       galHeight={400}
//       galWidth={400}
//       buttonHeight={30}
//       buttonWidth={60}
//       numImgs={36}
//       currIndex={1}
//     />);
//     var newImgRegex = getRegex(1, 0);
//     expect(screen.getAllByAltText(newImgRegex).length).toBeGreaterThan(1);
//   });



  // describe('style thumbnails', () => {
  //   it('change the main gallery image when clicked', async () => {
  //     const { rerender } = render(<MockOverview
  //       Component={CurrentProduct}
  //       pid="13023"/>);


  //     waitForElementToBeRemoved(screen.getAllByAltText(/is loading/i)).then(() => {
  //       console.log(document.getElementById('defaultThumbs'));


  //       var defaultScrollSpy = jest.spyOn(document.getElementById('defaultThumbs')).mockImplementation(()=>{});

  //       var currentStyleRegex = new RegExp('^' + '(?=.*selected)' + '(?=.*' + dummyState.styles[0].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
  //       expect(screen.getByAltText(currentStyleRegex)).toBeInTheDocument();

  //       var newCurrentStyleRegex = new RegExp('^' + '(?=.*selected)' + '(?=.*' + dummyState.styles[1].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
  //       expect(screen.getByAltText(newCurrentStyleRegex)).not.toBeInTheDocument();


  //       var newStyleRegex = new RegExp('^' + '(?=.*' + dummyState.styles[1].name + ')' + '(?=.*' + dummyState.product.name + ').*$', 'i');
  //       fireEvent.click(screen.getByAltText(newStyleRegex));

  //       expect(screen.getByAltText(newCurrentStyleRegex)).toBeInTheDocument();

  //       expect(screen.getByAltText(currentStyleRegex)).not.toBeInTheDocument();

  //     });
  //   });
  // });

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