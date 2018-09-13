import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

export function * getUserProfile (api, action) {
  // make the call to the api
  const response = yield call(api.getProfile)
  if (response.ok) {
    // do data conversion here if needed
    yield put(UserActions.profileSuccess(response.data))
  } else {
    yield put(UserActions.profileFailure())
  }
}
