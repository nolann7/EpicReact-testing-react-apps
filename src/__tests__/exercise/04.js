// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/Username/i)
  const password = screen.getByLabelText(/Password/i)
  const submitButton = screen.getByRole('button', {name: /Submit/i})

  await userEvent.type(username, 'bob')
  await userEvent.type(password, '123456')
  await userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: 'bob',
    password: '123456',
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
