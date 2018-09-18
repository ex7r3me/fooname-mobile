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
import UpdateUserActions from '../Redux/UpdateUserRedux'
import UserActions from '../Redux/UserRedux'
import SnackbarActions from '../Redux/SnackbarRedux'

export function * patchUserProfile (api, action) {
  const { profile } = action
  const response = yield call(api.patchProfile, profile)

  if (response.ok) {
    yield put(UpdateUserActions.updateUserSuccess())
    yield put(UserActions.profileSuccess(response.data))
  } else {
    yield put(UpdateUserActions.updateUserFailure())
    yield put(SnackbarActions.snackbarRequest({ message: `Couldn't update you profile please try again` }))
  }
}
