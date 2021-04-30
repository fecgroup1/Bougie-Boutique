import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts/index.js';
import ProductCard from '../components/RelatedProducts/ProductCard';
import { light } from '../Styles/themes.jsx';
import dummyRelated from '../Utils/dummyRelated.json'
import { act } from 'react-dom/test-utils';

jest.mock('axios');

const store = {}
store.state = {"currentProductId": "13023"};

test('<RelatedProducts /> renders without crashing', () => {
  const div = document.createElement('div')
  axios.get.mockResolvedValue(dummyRelated);

    render(
      <RelatedProducts store={store} theme={light} />, div
    )

  jest.resetAllMocks()
})

test('will render Product Card', () => {
  const div = document.createElement('div')
  render (
    <RelatedProducts store={store} theme={light} />, div
  )
})