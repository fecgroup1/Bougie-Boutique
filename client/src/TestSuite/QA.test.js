import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Appstore from '../Utils/Appstore'
import QandA from '../components/QandA'

test('discretely renders QA to the DOM with Appstore state', () => {
  render(<QandA store={Appstore}/>)
})