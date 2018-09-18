import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SnackbarRedux'
const TEST_SNACKBAR = {
  visible: true,
  message: 'snackbar test',
  timeout: 5000,
  onRequestClose: () => {}
}

test('attempt', () => {
  const state = reducer(INITIAL_STATE, Actions.snackbarRequest(TEST_SNACKBAR))

  expect(state.snackbar.visible).toBe(true)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.snackbarSuccess())

  expect(state.snackbar.visible).toBe(false)
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.snackbarFailure())

  expect(state.snackbar.visible).toBe(false)
  expect(state.error).toBe(true)
})

test('close', () => {
  const state = reducer(INITIAL_STATE, Actions.snackbarClose())

  expect(state.snackbar.visible).toBe(false)
})
