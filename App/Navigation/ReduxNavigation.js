import React from 'react'
import { BackHandler, Platform } from 'react-native'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
const prefix = Platform.OS === 'android' ? 'ga.fooname.app://login/' : 'ga.fooname.app://'
class ReduxNavigation extends React.Component {
  componentWillMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === 'LaunchScreen')) {
        return false
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render () {
    return <AppNavigation uriPrefix={prefix} />
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
