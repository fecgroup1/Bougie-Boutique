import React from 'react';
import {render, screen, fireEvent, act, waitForElementToBeRemoved, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts/index.js';
import ProductCard from '../components/RelatedProducts/ProductCard';
import { light } from '../Styles/themes.jsx';
import dummyRelated from '../Utils/dummyRelated.json';
import dummyState from '../Utils/dummyState.json'

jest.mock('axios');

const customGlobal = global;
const store = {}
store.state = dummyState;

// beforeEach(() => {
//   const div = document.createElement('div');
//   const promise = Promise.resolve(dummyRelated);
//   store.getRelated = () => {return promise}

//   render(
//     <RelatedProducts store={store} theme={light} />, div
//   )
// })

test('<RelatedProducts /> renders without crashing', async () => {
  const div = document.createElement('div');
  const promise = Promise.resolve(dummyRelated);
  store.getRelated = () => {return promise}

    render(
      <RelatedProducts store={store} theme={light} />, div
    )
    await waitForElementToBeRemoved(() => screen.getAllByLabelText(/spinner/i)[0])

})

test('Succesfully handles the realted products API call', () => {

  const loadingErrorMessage = screen.queryByAltText(/error loading products/i)
  expect(loadingErrorMessage).toBe(null);

})

test('Proudct cards render with related products received by the api call', async () => {

  const div = document.createElement('div');
  const promise = Promise.resolve(dummyRelated);
  store.getRelated = () => {return promise}

  render(
    <RelatedProducts store={store} theme={light} />, div
  )

  await waitFor(() => {
    const productCards = screen.getAllByLabelText(/productCard/i);
    expect(productCards.length).toEqual(dummyRelated.length);
  })

})

test('Tests that the comparison modal renders when clicking compare on a product card', async () => {
  const div = document.createElement('div');
  const promise = Promise.resolve(dummyRelated);
  store.getRelated = () => {return promise}

  render(
    <RelatedProducts store={store} theme={light} />, div
  )

  await waitFor(() => {
    const productCards = screen.getAllByLabelText(/productCard/i);
  })
  fireEvent.click(screen.getByLabelText(/relatedproduct0 action button/i))
  const comparisonChart = screen.getByLabelText(/comparison chart/i);
  expect(comparisonChart).toBeTruthy();
})

test('Create new saved outfit', async () => {
  const div = document.createElement('div');
  const promise = Promise.resolve(dummyRelated);
  store.getRelated = () => {return promise}

  render(
    <RelatedProducts store={store} theme={light} />, div
  )

  let preClickCardCount;

  await waitFor(() => {
    preClickCardCount = screen.getAllByLabelText(/productCard/i);
  })

  fireEvent.click(screen.getByLabelText(/add outfit button/i))
  const postClickCardCount = screen.getAllByLabelText(/productCard/i);

  expect(postClickCardCount.length).toBeGreaterThan(preClickCardCount.length)
})