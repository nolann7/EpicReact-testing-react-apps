// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function render(ui, {theme = 'light', ...options} = {}) {
  function AllProviders({children}) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return rtlRender(ui, {wrapper: AllProviders, ...options})
}

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})
test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})
