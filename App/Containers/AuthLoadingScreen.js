import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  AsyncStorage,
  ActivityIndicator,
  View,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AuthLoadingScreenStyle'

class AuthLoadingScreen extends Component {
  constructor (props) {
    super(props)
    this._bootstrapAsync()
  }
  _bootstrapAsync = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(accessToken ? 'App' : 'Auth')
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
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
