import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { UserTypes } from '../Redux/UserRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { UpdateUserTypes } from '../Redux/UpdateUserRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getUserProfile } from './UserSagas'
import { getAuth, logout } from './AuthSagas'
import { patchUserProfile } from './UpdateUserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(UserTypes.PROFILE_REQUEST, getUserProfile, api),
    takeLatest(AuthTypes.AUTH_REQUEST, getAuth, api),
    takeLatest(AuthTypes.LOGOUT, logout, api),
    takeLatest(UpdateUserTypes.UPDATE_USER_REQUEST, patchUserProfile, api)
  ])
}
