import React, { Component } from 'react'
import { ScrollView, Text, Linking
, View, Button } from 'react-native'
import Auth0 from 'react-native-auth0'
const auth0 = new Auth0({
  domain: 'fooname.eu.auth0.com',
  clientId: '7mgRrH24na7Rt3X-75AsZRuRZyJ7DuHl'
})
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  openProfileScreen = (credentials) => {
    this.props.navigation.navigate('ProfileScreen', {credentials})
  }
  loginWithTwitter = () => {
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email', audience: 'https://fooname.eu.auth0.com/userinfo' })
      .then(credentials => {
        this.openProfileScreen(credentials)
      }
      )
      .catch(error => console.log(error))
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <View style={styles.centered}>
              <Text>Welcome to fooName</Text>
              <Text>Login with Twitter to continue</Text>
            </View>
            <Button onPress={this.loginWithTwitter} title='Login with twitter' />
            <Button title='Login with loopback' onPress={() => { Linking.openURL('http://127.0.0.1:8080/api/auth/twitter') }}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}
