import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button } from 'react-native'
import { Images } from '../Themes'
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({
  domain: 'fooname.eu.auth0.com',
  clientId: '7mgRrH24na7Rt3X-75AsZRuRZyJ7DuHl'
})

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  loginWithTwitter () {
    auth0
      .webAuth
      .authorize({ scope: 'openid profile email', audience: 'https://fooname.eu.auth0.com/userinfo' })
      .then(credentials =>
        console.log(credentials)
        // Successfully authenticated
        // Store the accessToken
      )
      .catch(error => console.log(error))
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
            <Button onPress={this.loginWithTwitter} title='Login with twitter' />
          </View>

        </ScrollView>
      </View>
    )
  }
}
