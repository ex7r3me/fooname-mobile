import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

export function * getUserProfile (api, action) {
  const response = yield call(api.getProfile)
  if (response.ok) {
    yield put(UserActions.profileSuccess(response.data))
  } else {
    yield put(UserActions.profileFailure())
  }
}
