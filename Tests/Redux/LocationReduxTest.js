import Actions, { reducer, INITIAL_STATE, LocationSelectors } from '../../App/Redux/LocationRedux'
const TEST_LOCATION = {lat: '37.263056', lon: '-115.79302'}

test('request location', () => {
  const state = reducer(INITIAL_STATE, Actions.locationRequest())

  expect(state.fetching).toBe(true)
  expect(state.hasLocation).toBe(false)
})

test('location success', () => {
  const state = reducer(INITIAL_STATE, Actions.locationSuccess(TEST_LOCATION))

  expect(state.location).toEqual(TEST_LOCATION)
  expect(state.fetching).toBe(false)
  expect(state.hasLocation).toBe(true)
})

test('location failure', () => {
  const state = reducer(INITIAL_STATE, Actions.locationFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
  expect(state.hasLocation).toBe(false)
})

test('selector', () => {
  const location = LocationSelectors.getLocation({location: TEST_LOCATION})
  
  expect(location).toBe(TEST_LOCATION)
})
