import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  profileRequest: null,
  profileSuccess: ['profile'],
  profileFailure: null
})

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  baseUsername: null,
  cityId: null,
  cityName: null,
  createDate: null,
  updateDate: null,
  realm: null,
  username: null,
  emoji: 'sunny'
})

export const request = (state) =>
  state.merge({ fetching: true })

// successful avatar lookup
export const success = (state, action) => {
  const { profile } = action
  return state.merge({ fetching: false, error: null, ...profile })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure
})
