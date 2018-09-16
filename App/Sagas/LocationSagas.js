/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import LocationActions from '../Redux/LocationRedux'

export function * getLocation (api, action) {
  const locationOptions = { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  const getUserLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
    location => resolve(location),
    error => reject(error),
    locationOptions
  )
  })
  try {
    const location = yield call(getUserLocation)
    const {latitude, longitude} = location.coords
    if (latitude === 0 && longitude === 0) { throw new Error('Location Not found') }
    yield put(LocationActions.locationSuccess({latitude, longitude}))
  } catch (e) {
    console.log(e)
    yield put(LocationActions.locationFailure())
  }
}
