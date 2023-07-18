// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const {username, password} = buildLoginForm({password: 'abc'})

  console.log({username, password})

  await userEvent.type(screen.getByLabelText(/Username/i), username)
  await userEvent.type(screen.getByLabelText(/Password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /Submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

// function buildLoginForm(props) {
//   return {
//     username: faker.internet.userName(),
//     password: faker.internet.password(),
//     ...props,
//   }
// }
