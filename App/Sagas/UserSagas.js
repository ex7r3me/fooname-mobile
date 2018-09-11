import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { AsyncStorage } from 'react-native'

export function * getUserProfile (api, action) {
  // make the call to the api
  let accessToken = yield AsyncStorage.getItem('accessToken')
  accessToken = accessToken.replace(/['"]+/g, '')
  if (accessToken) {
    const response = yield call(api.getProfile, accessToken)
    if (response.ok) {
    // do data conversion here if needed
      yield put(UserActions.profileSuccess(response.data))
    } else {
      yield put(UserActions.profileFailure())
    }
  }
}
