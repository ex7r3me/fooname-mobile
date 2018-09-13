import React, { Component } from 'react'
import {
  ActivityIndicator,
  View,
  StatusBar
} from 'react-native'

// Styles
import styles from './Styles/AuthLoadingScreenStyle'

class AuthLoadingScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    )
  }
}

export default AuthLoadingScreen
