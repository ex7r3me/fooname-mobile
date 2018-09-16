import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locationRequest: null,
  locationSuccess: ['location'],
  locationFailure: null
})

export const LocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  location: null,
  hasLocation: false,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const LocationSelectors = {
  getLocation: state => state.location
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, hasLocation: false, location: null })

// successful api lookup
export const success = (state, action) => {
  const { location } = action
  return state.merge({ fetching: false, error: null, location, hasLocation: true })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, location: null, hasLocation: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_REQUEST]: request,
  [Types.LOCATION_SUCCESS]: success,
  [Types.LOCATION_FAILURE]: failure
})
