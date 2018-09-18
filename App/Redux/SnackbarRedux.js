import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  snackbarRequest: ['snackbar'],
  snackbarSuccess: null,
  snackbarFailure: null,
  snackbarClose: null
})

export const SnackbarTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  snackbar: {
    message: 'fooname!',
    visible: false,
    timeout: 3000
  },
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const SnackbarSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const close = (state) => {
  return state.merge({snackbar: {visible: false}}, {deep: true})
}
export const request = (state, { snackbar }) => {
  snackbar.visible = true
  return state.merge({ snackbar })
}

// successful api lookup
export const success = (state, action) => {
  return state.merge({ error: null })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ error: true, snackbar: {visible: false} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SNACKBAR_REQUEST]: request,
  [Types.SNACKBAR_SUCCESS]: success,
  [Types.SNACKBAR_FAILURE]: failure,
  [Types.SNACKBAR_CLOSE]: close
})
