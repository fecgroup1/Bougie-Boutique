import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// import App from './app.jsx'
import Overview from '../components/Overview';
import CurrentProduct from '../Utils/CurrentProduct.js';

describe('Overview', () => {
  test('renders the Overview component', (CurrentProduct) => {
    render(<Overview />);
  })
})