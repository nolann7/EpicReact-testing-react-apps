// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)
  const [decrement, increment] = [
    screen.getByRole('button', {name: /decrement/i}),
    screen.getByRole('button', {name: /increment/i}),
  ]
  const message = screen.getByText(/Current count/i)
  const user = userEvent.setup()

  expect(message).toHaveTextContent('Current count: 0')
  await user.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await user.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
