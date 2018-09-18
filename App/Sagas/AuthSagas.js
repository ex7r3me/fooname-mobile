import { call, select, put } from 'redux-saga/effects'
import AuthActions, {AuthSelectors} from '../Redux/AuthRedux'
import NavigationService from '../Services/NavigationService'
import UserActions from '../Redux/UserRedux'

export function * getAuth (api, action) {
  const currentData = yield select(AuthSelectors.getData)
  if (currentData.accessToken) {
    yield call(NavigationService.navigate, 'App')
    yield call(api.setAccessToken, currentData.accessToken)
    yield put(UserActions.profileRequest())
  } else {
    yield call(NavigationService.navigate, 'Auth')
  }
}
export function * logout (api, action) {
  yield call(api.logout)
  yield call(api.removeAccessToken)
  yield call(AuthActions.authSuccess, null)
  yield call(NavigationService.navigate, 'Auth')
}
