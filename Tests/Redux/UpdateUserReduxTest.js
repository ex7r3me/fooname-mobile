import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/UpdateUserRedux'
const TEST_USER = require('../../App/Fixtures/testUser.json')

test('update user attempt', () => {
  const state = reducer(INITIAL_STATE, Actions.updateUserRequest(TEST_USER))

  expect(state.fetching).toBe(true)
})

test('update user success', () => {
  const state = reducer(INITIAL_STATE, Actions.updateUserSuccess())

  expect(state.fetching).toBe(false)
})

test('update user failure', () => {
  const state = reducer(INITIAL_STATE, Actions.updateUserFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})
