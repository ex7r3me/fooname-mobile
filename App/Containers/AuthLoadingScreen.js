import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AuthLoadingScreenStyle'

class AuthLoadingScreen extends Component {
  constructor (props) {
    super(props)
    this.props.getAccessToken()
  }
  componentDidUpdate () {
    if (this.props.fetching === false) {
      this.props.navigation.navigate(this.props.accessToken ? 'App' : 'Auth')
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken,
    fetching: state.auth.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAccessToken: () => dispatch(AuthActions.authRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
