// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const buildLoginForm = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
  })
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/Username/i), username)
  await userEvent.type(screen.getByLabelText(/Password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /Submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
