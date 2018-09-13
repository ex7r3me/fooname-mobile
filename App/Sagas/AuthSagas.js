import { call, select } from 'redux-saga/effects'
import AuthActions, {AuthSelectors} from '../Redux/AuthRedux'
import NavigationService from '../Services/NavigationService'

export function * getAuth (api, action) {
  try {
    const currentData = yield select(AuthSelectors.getData)

    if (currentData.accessToken) {
      yield call(NavigationService.navigate, 'App')
      yield call(api.setAccessToken, currentData.accessToken)
    } else {
      yield call(NavigationService.navigate, 'Auth')
    }
  } catch (e) { console.log(e) }
}
export function * logout (api, action) {
  try {
    yield call(api.logout)
    yield call(NavigationService.navigate, 'Auth')
    yield call(AuthActions.authSuccess, null)
    yield call(api.removeAccessToken)
  } catch (e) {
    console.log(e)
  }
}
