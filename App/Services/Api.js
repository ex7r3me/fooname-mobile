// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
export const baseURL = __DEV__
  ? 'http://127.0.0.1:8080/api/'
  : 'https://fooname.now.sh/api/'
const create = () => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  let accessToken = null
  const setAccessToken = (newAccessToken) => { accessToken = newAccessToken }
  const removeAccessToken = () => { accessToken = null }

  const getRoot = () => api.get('')
  const getRate = () => api.get('rate_limit')
  const getUser = username => api.get('search/users', { q: username })
  const logout = () =>
    api.get(`users/logout?access_token=${accessToken}`)
  const saveCityId = (cityId) =>
    api.patch(`/users/me?access_token=${accessToken}`, { cityId })
  const patchByCoordination = (lat, lon) =>
    api.patch(`/users/coordination?access_token=${accessToken}`, { lat, lon })
  const patchEmoji = (emoji) =>
    api.patch(`/users/me?access_token=${accessToken}`, { emoji, autoUpdate: false })
  const getProfile = () =>
    api.get(`/users/me?access_token=${accessToken}`)
  const patchProfile = (profile) =>
      api.patch(`/users/me?access_token=${accessToken}`, { ...profile })

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAccessToken,
    removeAccessToken,
    getRoot,
    getRate,
    getUser,
    getProfile,
    patchProfile,
    saveCityId,
    patchByCoordination,
    patchEmoji,
    logout
  }
}

// let's return back our create method as the default.
export default {
  create
}
