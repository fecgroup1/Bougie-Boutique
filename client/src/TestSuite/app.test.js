import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from '../app.jsx'

describe('App', () => {
  test('renders the App component', () => {
    render(<App />);
  })
})