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
  emoji: 'sunny',
  accessToken: null,
  profileImage: null,
  bannerImage: null
})

export const request = (state) =>
  state.merge({ fetching: true })

export const success = (state, action) => {
  const { profile } = action
  return state.merge({ fetching: false, error: null, ...profile })
}
export const failure = (state) =>
  state.merge({ fetching: false, error: true, profile: INITIAL_STATE })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure
})
