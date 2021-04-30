import React, { useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Nav from './../components/Nav';
import { dark, light } from './../Styles'

var theme = dark;

const toggleTheme = () => {
  if (theme === dark) {
    theme = light;
  } else {
    theme = dark;
  }
};

const MockNav = ({cart}) => (
  <Nav
    cart={cart}
    toggleTheme={toggleTheme}
    theme={theme}/>
);

test('Nav renders onto the page', () => {
  render(<MockNav cart={{}}/>);

  const titleDiv = screen.getByText('Bougie Boutique', { exact: false });
  expect(titleDiv).toBeInTheDocument();
});


test('theme button toggles theme colors upon click', () => {
  render(<MockNav cart={{}}/>);

  var currentThemeInvertVal = theme.invertWht;
  fireEvent.click(screen.getByRole('button', {name: 'Theme Toggle'}));
  var newThemeInvertVal = theme.invertWht;
  expect(newThemeInvertVal).not.toBe(currentThemeInvertVal);
});

test('cart value updates when new products are added', () => {
  const { rerender } = render(<MockNav cart={{sku: 1}}/>);
  expect(screen.getByLabelText(/Cart Count/i)).toHaveTextContent('1');

  rerender(<MockNav cart={{sku: 1, newSku: 2}}/>);
  expect(screen.getByLabelText(/Cart Count/i)).toHaveTextContent('3');

});