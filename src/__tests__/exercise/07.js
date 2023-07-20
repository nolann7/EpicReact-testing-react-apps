// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from 'test/test-utils'
import userEvent from '@testing-library/user-event'

import EasyButton from '../../components/easy-button'
import App from 'examples/easy-button'

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

test('theme toggles from light to dark and back when button toggle is clicked', async () => {
  render(<App />)
  const user = userEvent.setup()
  const easyButton = screen.getByRole('button', {name: /Easy/i})
  const toggleButton = screen.getByRole('button', {name: /Toggle theme/i})

  // from default light to dark
  await user.click(toggleButton)
  expect(easyButton).toHaveStyle('color: white; background-color: black;')
  expect(toggleButton).toHaveTextContent(/dark/i)
  // from dark theme to light
  await user.click(toggleButton)
  expect(easyButton).toHaveStyle('color: black; background-color: white;')
  expect(toggleButton).toHaveTextContent(/light/i)
})
