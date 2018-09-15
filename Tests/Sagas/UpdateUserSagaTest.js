/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getUpdateUser to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { patchUserProfile } from '../../App/Sagas/UpdateUserSagas'
import UpdateUserActions from '../../App/Redux/UpdateUserRedux'
import UserActions from '../../App/Redux/UserRedux'

const TEST_USER = require('../../App/Fixtures/testUser.json')

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', () => {
  const step = stepper(patchUserProfile(FixtureAPI, {profile: TEST_USER}))
  // first yield is the API
  expect(step()).toEqual(call(FixtureAPI.patchProfile, {...TEST_USER}))
})

test('success path', () => {
  const response = FixtureAPI.patchProfile(TEST_USER)
  const step = stepper(patchUserProfile(FixtureAPI, {profile: TEST_USER}))
  // Step 1: Htest the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UpdateUserActions.updateUserSuccess()))
})

test('success path update profile', () => {
  const response = FixtureAPI.patchProfile(TEST_USER)
  const step = stepper(patchUserProfile(FixtureAPI, {profile: TEST_USER}))
  // Step 1: Htest the api
  step()
  step(response)
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserActions.profileSuccess(response.data)))
})

test('failure path', () => {
  const response = {ok: false}
  const step = stepper(patchUserProfile(FixtureAPI, {profile: TEST_USER}))
  // Step 1: Htest the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UpdateUserActions.updateUserFailure()))
})
