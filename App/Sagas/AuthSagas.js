import { call, select } from 'redux-saga/effects'
import AuthActions, {AuthSelectors} from '../Redux/AuthRedux'
import NavigationService from '../Services/NavigationService'

export function * getAuth (api, action) {
  const currentData = yield select(AuthSelectors.getData)
  if (currentData.accessToken) {
    yield call(NavigationService.navigate, 'App')
    yield call(api.setAccessToken, currentData.accessToken)
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
