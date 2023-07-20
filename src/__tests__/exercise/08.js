// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
function Counter({initial}) {
  const {count, increment, decrement} = useCounter(initial)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>++</button>
      <button onClick={decrement}>--</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  let initialCount = 5
  let step = 2
  render(<Counter initial={{initialCount, step}} />)
  screen.debug()
  const count = screen.getByText(/count/i)
  const btnInc = screen.getByRole('button', {name: '++'})
  const btnDec = screen.getByRole('button', {name: '--'})

  expect(count).toHaveTextContent(initialCount)

  await userEvent.click(btnInc)
  expect(count).toHaveTextContent(initialCount + step)

  await userEvent.click(btnDec)
  expect(count).toHaveTextContent(initialCount)
})

/* eslint no-unused-vars:0 */
