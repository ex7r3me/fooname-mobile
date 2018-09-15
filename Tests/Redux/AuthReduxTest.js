import Actions, { reducer, INITIAL_STATE, AuthSelectors } from '../../App/Redux/AuthRedux'

test('request', () => {
  const state = reducer(INITIAL_STATE, Actions.authRequest())

  expect(state.fetching).toBe(true)
  expect(state.accessToken).toBeNull()
  expect(state.error).toBeNull()
})

test('success', () => {
  const accessToken = 'TEST_ACCESS_TOKEN'
  const state = reducer(INITIAL_STATE, Actions.authSuccess(accessToken))

  expect(state.fetching).toBe(false)
  expect(state.accessToken).toBe(accessToken)
  expect(state.error).toBeNull()
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.authFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
  expect(state.accessToken).toBeNull()
})

test('selector', () => {
  const accessToken = 'TEST_ACCESS_TOKEN'
  const state = AuthSelectors.getData({auth: {accessToken}})

  expect(state.accessToken).toBe(accessToken)
})
