import React from 'react'
import RelatedAPI from '../Utils/RelatedAPI';
import axios from 'axios'
import { render, fireEvent } from '@testing-library/react'
import Related from '../components/RelatedProducts'
import CurrentProduct from '../Utils/currentProduct.js'
import {ThemeProvider} from 'styled-components'
import { Body, dark, light } from '../Styles';
import dummyRelated from '../Utils/dummyRelated.json'

jest.mock('axios');

// test('getRelated retrieves the product information for all of the products realted to the currentProduct and returns it as an array of objects', () => {
//   const related = [{currentProductId: 13024}, {currentProductId: 13025}, {currentProductId: 13029}, {currentProductId: 13030}]
//   const resp = {data: related};
//   axios.get.mockResolvedValue(resp);

//   return RelatedAPI.getRelatedProducts(13023)
//     .then(data => expect(data).toEqual(related))
// });
const store = {}
store.state = {"currentProductId": "13023"};

test('related products container renders properly', () => {
  const div = document.createElement('div')
  axios.get.mockResolvedValue(dummyRelated);
  const {getByText} = render(
  <ThemeProvider theme={light}>
      <Related store={store}/>
  </ThemeProvider>, div
  )
  expect(getByText('Related Products'))
})