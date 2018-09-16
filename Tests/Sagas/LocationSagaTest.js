/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getLocation to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getLocation } from '../../App/Sagas/LocationSagas'
import LocationActions from '../../App/Redux/LocationRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls location', () => {
  const step = stepper(getLocation(FixtureAPI, {data: 'taco'}))
  // first yield is the API
  expect(step()).toEqual(call(FixtureAPI.getLocation, 'taco'))
})

test('success path', () => {
  const response = FixtureAPI.getLocation('taco')
  const step = stepper(getLocation(FixtureAPI, {data: 'taco'}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LocationActions.locationSuccess(21)))
})

test('failure path', () => {
  const response = {ok: false}
  const step = stepper(getLocation(FixtureAPI, {data: 'taco'}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LocationActions.locationFailure()))
})
