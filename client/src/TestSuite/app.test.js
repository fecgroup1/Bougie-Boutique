import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// import App from './app.jsx'
import Overview from '../components/Overview'

describe('Overview', () => {
  test('renders the Overview component', () => {
    render(<Overview />);
  })
})