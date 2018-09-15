import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/UserRedux'

const TEST_USER = require('../../App/Fixtures/testUser.json')

test('user request', () => {
  const state = reducer(INITIAL_STATE, Actions.profileRequest())

  expect(state.fetching).toBe(true)
})

test('update user success', () => {
  const state = reducer(INITIAL_STATE, Actions.profileSuccess({profile: TEST_USER}))

  expect(state.fetching).toBe(false)
  expect(state.profile).toEqual(TEST_USER)
  expect(state.error).toBeNull()
})

test('update user failure', () => {
  const state = reducer(INITIAL_STATE, Actions.profileFailure())

  expect(state.fetching).toBe(false)
  expect(state.profile).toEqual(INITIAL_STATE)
  expect(state.error).toBe(true)
})
