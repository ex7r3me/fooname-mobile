import React, { Component } from 'react'
import { Text, Linking, View } from 'react-native'
import { Button } from 'react-native-material-ui'
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  }
  openProfileScreen = credentials => {
    this.props.navigation.navigate('ProfileScreen', { credentials })
  }
  render () {
    return (
      <View style={styles.section}>
        <View style={styles.centered}>
          <Text>Welcome to fooName</Text>
          <Text>Login with Twitter to continue</Text>
        </View>
        <Button
          raised
          primary
          style={styles.button}
          onPress={() => {
            Linking.openURL('http://127.0.0.1:8080/api/auth/twitter')
          }}
          text='Login with Twitter'
        />
        <Button
          raised
          primary
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('ProfileScreen')
          }}
          text='Profile'
        />
        <Button
          raised
          primary
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('ProfileScreen', {
              credentials: '4EG6X4CjAijdPSTKWAiK4lHCD54nLHsxS0sDYnl9jsDDxkFcN8ZG7pEYqiuW9J5I'
            })
          }}
          text='Profile set'
        />
      </View>
    )
  }
}
