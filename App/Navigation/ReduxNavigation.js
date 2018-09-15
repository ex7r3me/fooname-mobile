import React from 'react'
import { Platform } from 'react-native'
import AppNavigation from './AppNavigation'
import NavigationService from '../Services/NavigationService'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

const prefix = Platform.OS === 'android' ? 'ga.fooname.app://login/' : 'ga.fooname.app://'

class ReduxNavigation extends React.Component {
  componentDidMount () {
    NavigationService.setTopLevelNavigator(this._input)
    this.props.getAccessToken()
  }
  render () {
    return <AppNavigation
      user={this.props.user}
      screenProps={{
        logout: this.props.logout,
        user: this.props.user
      }}
      ref={(c) => { this._input = c }}
      uriPrefix={prefix}
      />
  }
}
const mapStateToProps = state => {
  const user = state.user
  return { user }
}
const mapDispatchToProps = (dispatch) => ({
  getAccessToken: () => dispatch(AuthActions.authRequest()),
  logout: () => dispatch(AuthActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigation)
