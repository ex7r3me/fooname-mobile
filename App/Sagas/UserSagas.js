import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import SnackbarActions from '../Redux/SnackbarRedux'

export function * getUserProfile (api, action) {
  const response = yield call(api.getProfile)
  if (response.ok) {
    yield put(UserActions.profileSuccess(response.data))
  } else {
    yield put(UserActions.profileFailure())
    yield put(SnackbarActions.snackbarRequest({ message: `There was a problem fetching your profile` }))
  }
}
