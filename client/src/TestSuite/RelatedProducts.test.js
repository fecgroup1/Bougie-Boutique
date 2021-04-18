import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import RelatedProducts from '../components/RelatedProducts'
import AppStore from '../Utils/AppStore'

describe('RelatedProducts', () => {
  test('renders the RelatedProducts component and allows for rendering of AppStore data', () => {
    render(
      <RelatedProducts store={AppStore}/>
    );
  })
})