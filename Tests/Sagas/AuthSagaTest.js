import FixtureAPI from '../../App/Services/FixtureApi'
import { call, select, put } from 'redux-saga/effects'
import { getAuth, logout } from '../../App/Sagas/AuthSagas'
import AuthActions, {AuthSelectors} from '../../App/Redux/AuthRedux'
import NavigationService from '../../App/Services/NavigationService'
import UserActions from '../../App/Redux/UserRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('accessing token using select', () => {
  const step = stepper(getAuth(FixtureAPI))
  expect(step()).toEqual(select(AuthSelectors.getData))
})

test('already login path navigation', () => {
  const authState = {accessToken: 'TEST_ACCESS_TOKEN'}
  const step = stepper(getAuth(FixtureAPI))
  step()
  expect(step(authState)).toEqual(call(NavigationService.navigate, 'App'))
})

test('already login path set api key', () => {
  const authState = {accessToken: 'TEST_ACCESS_TOKEN'}
  const step = stepper(getAuth(FixtureAPI))
  step()
  step(authState)
  expect(step()).toEqual(call(FixtureAPI.setAccessToken, authState.accessToken))
})

test('already login get profile', () => {
  const authState = {accessToken: 'TEST_ACCESS_TOKEN'}
  const step = stepper(getAuth(FixtureAPI))
  step()
  step(authState)
  step()
  expect(step()).toEqual(put(UserActions.profileRequest()))
})

test('not logged in path navigation', () => {
  const authState = {accessToken: null}
  const step = stepper(getAuth(FixtureAPI))
  step()
  expect(step(authState)).toEqual(call(NavigationService.navigate, 'Auth'))
})

test('logout api call', () => {
  const step = stepper(logout(FixtureAPI))
  expect(step()).toEqual(call(FixtureAPI.logout))
})
test('logout remove token from api', () => {
  const step = stepper(logout(FixtureAPI))
  step()
  expect(step()).toEqual(call(FixtureAPI.removeAccessToken))
})

test('logout remove token from state', () => {
  const step = stepper(logout(FixtureAPI))
  step()
  step()
  expect(step()).toEqual(call(AuthActions.authSuccess, null))
})

test('logout navigate to auth screen', () => {
  const step = stepper(logout(FixtureAPI))
  step()
  step()
  step()
  expect(step()).toEqual(call(NavigationService.navigate, 'Auth'))
})
